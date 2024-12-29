import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is RO3 Water?",
    answer: "RO3 Water is a premium water purification company that provides clean, safe drinking water through our advanced 6-step purification process."
  },
  {
    question: "Is RO3 Water healthy?",
    answer: "Yes, RO3 Water is extremely healthy. Our purification process removes harmful contaminants while maintaining essential minerals."
  },
  {
    question: "How much is RO3 Water per Litre?",
    answer: "Our water prices vary by location and quantity. Please contact your nearest store for current pricing."
  },
  {
    question: "What is the PH level of RO3 Water?",
    answer: "RO3 Water maintains a balanced pH level that's perfect for drinking and optimal hydration."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-blue-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">Quench your curiosity</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-blue-600" />
                ) : (
                  <Plus className="w-5 h-5 text-blue-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}