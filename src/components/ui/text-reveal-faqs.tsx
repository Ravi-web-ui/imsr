'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQs() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'What programs does IMSR offer?',
      answer: 'IMSR offers premium specialized undergraduate and postgraduate courses, including the Bachelor of Business Administration (BBA) and Bachelor of Commerce (B.Com) in Sports Management, Business Analytics, and Global Leadership.',
    },
    {
      id: 'item-2',
      question: 'How does the placement assistance process work?',
      answer: 'We have a dedicated Corporate Relations cell partnering with top-tier brands like Informa Markets, Panasonic, ABEC, BookMyShow, SFA Sports, and Wizcraft. We provide 100% placement support and pre-placement training.',
    },
    {
      id: 'item-3',
      question: 'What are the eligibility criteria for admission?',
      answer: 'Admissions are based on academic performance in high school/secondary education followed by a personal counseling session. Candidates who demonstrate a passion for sports, leadership, or business analytics are highly preferred.',
    },
    {
      id: 'item-4',
      question: 'Does the institute offer scholarships?',
      answer: 'Yes, IMSR offers merit-based scholarships to students with outstanding academic records, as well as sports-scholarships for state-level and national-level athletes.',
    },
    {
      id: 'item-5',
      question: 'Where can I contact the admissions helpdesk?',
      answer: 'You can reach out to our helpdesk at info@futurevarsity.org or visit our contact page to speak directly with an admissions advisor.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white text-zinc-900 border-t border-zinc-100 relative z-20">
      <div className="mx-auto max-w-7xl px-[15px]">
        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-2 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-zinc-950 tracking-tight leading-tight">
              Frequently <br />
              <span className="text-[#00bcda] font-serif italic">Asked Questions</span>
            </h2>
            <p className="text-zinc-500 mt-5 text-balance text-[16px] sm:text-[17px] font-sans font-light leading-relaxed">
              Everything you need to know about IMSR Admissions, Programs, and Placement Relations.
            </p>
            <p className="text-zinc-400 mt-8 hidden md:block text-sm font-sans font-light">
              Can’t find what you’re looking for? Reach out to our{' '}
              <Link
                href="#contact"
                className="text-[#00bcda] font-medium hover:underline"
              >
                admissions desk
              </Link>{' '}
              for assistance.
            </p>
          </div>

          <div className="md:col-span-3">
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-zinc-200 dark:border-zinc-800"
                >
                  <AccordionTrigger className="cursor-pointer text-base sm:text-lg font-display font-medium text-zinc-900 hover:text-[#00bcda] hover:no-underline transition-colors py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600">
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="text-zinc-400 mt-6 md:hidden text-sm">
            Can\'t find what you\'re looking for? Contact our{' '}
            <Link
              href="#contact"
              className="text-[#00bcda] font-medium hover:underline"
            >
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export const BlurredStagger = ({
  text,
}: {
  text: string;
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.008,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
      y: 2,
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
  };

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-[15px] sm:text-base leading-relaxed text-zinc-600 font-sans font-light break-words whitespace-normal py-2"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};
