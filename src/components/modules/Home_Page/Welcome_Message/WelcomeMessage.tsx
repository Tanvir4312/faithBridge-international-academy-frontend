"use client"
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const WelcomeMessage = () => {
   const [showFull, setShowFull] = useState<boolean>(false)

   const fullText = `Welcome to FaithBridge International Academy, where education is more than books, and learning is more than exams. Here, we believe in nurturing hearts along with minds — building students who not only excel in academics but also in character, discipline, and faith.
    
    At FaithBridge, we envision a generation that leads with integrity and purpose — where Islamic values are not separate from worldly knowledge, but rather the foundation upon which wisdom is built. We are a co-educational, English-medium institution that offers a dual curriculum integrating Islamic education with modern general subjects. This ensures our students are prepared both for this life and the hereafter.

    We provide a safe, inclusive, and nurturing environment where boys and girls can grow intellectually and spiritually. Our experienced and compassionate teachers focus not only on delivering knowledge, but on helping each child become a responsible, God-conscious human being. Every lesson, every interaction, and every day at FaithBridge is designed to align with our core values: sincerity, excellence, respect, and responsibility.

    Our academic curriculum is based on international best practices, with a strong focus on English, mathematics, science, technology, and social studies. Alongside, we offer robust Islamic studies including Quran memorization (Hifz), Arabic language, Seerah, Hadith, and Fiqh — fostering love for deen in the hearts of our students from an early age.

    We believe in balanced growth. Our classrooms encourage questioning and exploration. Our prayer spaces encourage reflection. Our playgrounds encourage teamwork and health. Our events encourage leadership and creativity. We aim to build strong Muslim individuals who can thrive in both university lecture halls and community prayer halls.

    FaithBridge International Academy is more than just a school — it is a community. A place where students, teachers, and parents work together to shape the future. We value communication and partnership with families because we know that a child’s development is best supported when school and home walk hand in hand.

    As you explore our website, you’ll find details about our curriculum, programs, school culture, facilities, and admissions. We hope this gives you a glimpse of the passion, care, and excellence that define FaithBridge. Whether you're a prospective parent, a returning family, or a visitor just curious to learn more — we welcome you with open arms and open hearts.

    May Allah (SWT) guide us all in the path of knowledge, sincerity, and success in both this world and the next.

    Warm regards,
    Principal
    FaithBridge International Academy`


   const halfText = fullText.substring(0, 800) + '...'

   return (
      <div className='flex flex-col'>
         <div className='text-center'>
            <h2 className='text-3xl font-bold heading'>Welcome Message</h2>
            <h1 className='text-[#007B5E] text-4xl font-bold heading my-2'>FaithBridge International Academy</h1>
            <h4 className='text-xl font-bold heading uppercase'>Bismillahir Rahmanir Raheem</h4>

            <p className='text-justify leading-relaxed body mt-7 whitespace-pre-line transition-all duration-500'>
               {showFull ? fullText : halfText}
            </p>
         </div>


         <Button
            onClick={() => setShowFull(!showFull)}
            variant="outline"
            className='mt-7 border-[#007B5E] text-[#007B5E] hover:bg-[#007B5E] hover:text-white transition-colors duration-300 z-50 w-30 cursor-pointer'
         >
            {showFull ? 'Show Less' : 'Read More'}
         </Button>
      </div>

   )
}

export default WelcomeMessage