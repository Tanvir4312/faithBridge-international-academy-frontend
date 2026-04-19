import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { success: false, message: "API base URL is not configured" },
      { status: 500 }
    );
  }

  try {
    const incomingFormData = await req.formData();
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const backendFormData = new FormData();

    // The backend expects metadata in a "data" JSON string
    const sectionName = incomingFormData.get("sectionName") as string;
    const description = incomingFormData.get("description") as string | null;

    const metaData: Record<string, string> = { sectionName };
    if (description) metaData.description = description;
    backendFormData.append("data", JSON.stringify(metaData));

    // Forward each file under the "media" field
    const files = incomingFormData.getAll("media") as File[];
    for (const file of files) {
      // Re-create the blob to ensure it's materialized correctly during streaming
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: file.type || "application/octet-stream" });
      backendFormData.append("media", blob, file.name);
    }

    const res = await fetch(`${API_BASE_URL}/media/upload`, {
      method: "POST",
      headers: { Cookie: cookieHeader },
      body: backendFormData,
    });

    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: json?.message ?? `Upload failed (${res.status})` },
        { status: res.status }
      );
    }

    return NextResponse.json(json, { status: res.status });
  } catch (error: any) {
    console.error("[/api/media/upload] Error:", error);
    return NextResponse.json(
      { success: false, message: error?.message ?? "Failed to upload media" },
      { status: 500 }
    );
  }
}
