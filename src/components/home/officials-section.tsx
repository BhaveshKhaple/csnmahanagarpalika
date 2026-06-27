import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/card';

const officials = [
  { 
    name: 'श्री देवेंद्र फडणवीस', 
    designation: 'मा.मुख्यमंत्री',
    department: 'महाराष्ट्र शासन',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/DevendraFadnavis17.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    bio: 'महाराष्ट्राचे मुख्यमंत्री आणि राज्याच्या विकासाचे प्रमुख'
  },
  { 
    name: 'श्री एकनाथ शिंदे', 
    designation: 'मा.उपमुख्यमंत्री',
    department: 'महाराष्ट्र शासन',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/Eknath_Shinde6.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    bio: 'महाराष्ट्राचे उपमुख्यमंत्री'
  },
  { 
    name: 'श्रीमती सुनेत्रा अजित पवार', 
    designation: 'मा.उपमुख्यमंत्री',
    department: 'महाराष्ट्र शासन',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/vahini-saheb5.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    bio: 'महाराष्ट्राच्या उपमुख्यमंत्री'
  },
  { 
    name: 'श्रीमती माधुरी मिसाळ', 
    designation: 'मा.राज्यमंत्री',
    department: 'नगरविकास विभाग',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/madhuri_misal21.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    bio: 'नगरविकास विभागाच्या राज्यमंत्री'
  },
  { 
    name: 'श्री समीर राजुरकर', 
    designation: 'मा.महापौर',
    department: 'CSMC',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/samir-bhaiya-rajurkar4.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    bio: 'छत्रपती संभाजीनगर महानगरपालिकेचे महापौर'
  },
  { 
    name: 'श्री राजेंद्र जंजाळ', 
    designation: 'मा.उपमहापौर',
    department: 'CSMC',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/raju-bhaiya-janjal5.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    bio: 'छत्रपती संभाजीनगर महानगरपालिकेचे उपमहापौर'
  },
  { 
    name: 'श्री अमोल येडगे (भा प्र से)', 
    designation: 'मा. महानगरपालिका आयुक्त',
    department: 'CSMC',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/amol_sir_gem5.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    bio: 'महानगरपालिकेचे मुख्य प्रशासकीय अधिकारी'
  },
];

export default function OfficialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            पदाधिकारी
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            आमचे नेतृत्व
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            छत्रपती संभाजीनगर महानगरपालिकेचे प्रमुख पदाधिकारी आणि नेतृत्व
          </p>
        </div>

        {/* Top Officials Grid - 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {officials.slice(0, 4).map((official, index) => (
            <Card key={index} hover className="group overflow-hidden border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
              <div className="relative">
                {/* Image Container */}
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center overflow-hidden">
                  <Link href={official.profileUrl} target="_blank" rel="noopener noreferrer" className="relative block h-full w-full">
                    <Image
                      src={official.image}
                      alt={official.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>
                
                {/* Blue Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    <p className="text-sm font-medium">{official.department}</p>
                    <p className="text-xs text-blue-200 mt-1">{official.bio}</p>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <CardBody className="text-center bg-white">
                <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-2">{official.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{official.designation}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Additional Officials - 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {officials.slice(4).map((official, index) => (
            <Card key={index} hover className="group overflow-hidden border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center overflow-hidden">
                  <Link href={official.profileUrl} target="_blank" rel="noopener noreferrer" className="relative block h-full w-full">
                    <Image
                      src={official.image}
                      alt={official.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>
                
                {/* Blue Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    <p className="text-sm font-medium">{official.department}</p>
                    <p className="text-xs text-blue-200 mt-1">{official.bio}</p>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <CardBody className="text-center bg-white">
                <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-2">{official.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{official.designation}</p>
              </CardBody>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
