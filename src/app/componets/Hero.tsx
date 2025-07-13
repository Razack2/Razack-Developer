import React from 'react';
import Link from 'next/link';
import TechBadgeList from './TechBadgeList';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="bg-white py-12" id='about'>
            <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                
                {/* Text Content */}
                <div className="md:w-1/2">
                    <h1 className="text-4xl mt-6 md:text-5xl font-bold text-gray-900 mb-6">
                        Software Engineer
                    </h1>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        I am a full-stack software engineer with a passion for building scalable and efficient web applications.
                    </p>
                    <div> 
                        <TechBadgeList />
                    </div>
                    <div className='mt-6'>
                        <Link
                        href="/#contact"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition"
                    >
                        Get in Touch &rarr;
                    </Link>
                    </div>
                
                    <p className="mt-6 text-gray-500 text-sm">
                        Check out my{" "}
                        <Link href="/#projects" className="text-blue-500 hover:underline">
                            projects
                        </Link>{" "}
                        for more insights into my work.
                    </p>
                </div>

                {/* Image */}
                <div className="md:w-1/2 flex justify-center">
                    <div className="  p-10 rounded-5xl transition">
                        <Image  
                            src="/me.jpg"
                            alt="Developer Razack"
                            width={280}
                            height={280}
                            className="h-40 w-40 md:h-70 md:w-70 rounded-full object-cover mx-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
