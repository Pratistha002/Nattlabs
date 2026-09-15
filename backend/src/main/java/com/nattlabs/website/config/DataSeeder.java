package com.nattlabs.website.config;

import com.nattlabs.website.model.ContentSection;
import com.nattlabs.website.model.PageContent;
import com.nattlabs.website.model.Testimonial;
import com.nattlabs.website.repository.PageContentRepository;
import com.nattlabs.website.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final TestimonialRepository testimonialRepository;
    private final PageContentRepository pageContentRepository;

    @Override
    public void run(String... args) {
        seedTestimonials();
        seedPages();
    }

    private void seedTestimonials() {
        if (testimonialRepository.count() == 0) {
            List<Testimonial> testimonials = List.of(
                testimonial("Bekkam Gayathri Rani Bai",
                        "Nattlabs shaped my confidence through expert mentorship and hands-on HVAC training. I now feel fully prepared to face real industry challenges with clarity and purpose.",
                        "/img/Bekkam Gayathri Rani Bai.jpg", 1),
                testimonial("Bhavana P N",
                        "The training at Nattlabs gave me direction, confidence, and practical skills. I now feel capable of contributing meaningfully to the BMS industry and beyond.",
                        "/img/Bhavana P N.jpg", 2),
                testimonial("Deekshitha D Y",
                        "Nattlabs helped me transform from a curious student into a confident professional, equipped with real-world BMS knowledge, communication skills, and industry exposure.",
                        "/img/Deekshitha D Y.jpg", 3),
                testimonial("Donaparthi Manasa",
                        "Thanks to Nattlabs supportive mentors and hands-on approach, I developed real technical and soft skills, gaining the confidence to pursue my career goals with determination.",
                        "/img/Donaparthi Manasa.jpg", 4),
                testimonial("Kruthika R",
                        "Nattlabs empowered me through practical learning and expert guidance. I grew as a professional and now feel ready to step confidently into the engineering workforce.",
                        "/img/Kruthika R.jpg", 5),
                testimonial("Tadavarthi Hiranya Lakshmi Sri Likitha",
                        "With structured training and real-world exposure at Nattlabs, I gained clarity, technical confidence, and communication skills that have prepared me for a meaningful career.",
                        "/img/stories-thadavarthi.jpg", 6),
                testimonial("Yashashwini S L",
                        "My journey at Nattlabs gave me direction, technical growth, and personal confidence. I now feel empowered to succeed in the evolving world of BMS and HVAC.",
                        "/img/Yashashwini S L.jpg", 7),
                testimonial("Harshitha A",
                        "Through practical labs and mentorship at Nattlabs, I developed strong industry-ready skills and communication abilities. This experience shaped my professional mindset and confidence.",
                        "/img/Harshita.jpg", 8),
                testimonial("Ifath Fathima",
                        "At Nattlabs, I found my confidence and technical voice. With great mentorship and real learning, I now feel equipped to grow in a professional environment.",
                        "/img/stories-ifath.jpg", 9),
                testimonial("Layavva H Goudannavar",
                        "Nattlabs helped me grow through hands-on experience and expert guidance. I now step forward with real skills, industry knowledge, and renewed confidence in my path.",
                        "/img/stories-layavva.jpg", 10)
            );

            testimonialRepository.saveAll(testimonials);
            log.info("Seeded {} testimonials.", testimonials.size());
        } else {
            log.info("Testimonials already seeded, skipping insert.");
        }

        repairTestimonialImageUrls();
    }

    /**
     * Photo filenames on disk do not always match the person's display name.
     * Correct stale Mongo URLs so the frontend does not 404 after the first seed.
     */
    private void repairTestimonialImageUrls() {
        Map<String, String> photosByName = Map.of(
                "Tadavarthi Hiranya Lakshmi Sri Likitha", "/img/stories-thadavarthi.jpg",
                "Ifath Fathima", "/img/stories-ifath.jpg",
                "Layavva H Goudannavar", "/img/stories-layavva.jpg"
        );

        int updated = 0;
        for (Testimonial testimonial : testimonialRepository.findAll()) {
            String corrected = photosByName.get(testimonial.getName());
            if (corrected != null && !corrected.equals(testimonial.getImageUrl())) {
                testimonial.setImageUrl(corrected);
                testimonialRepository.save(testimonial);
                updated++;
            }
        }
        if (updated > 0) {
            log.info("Corrected {} testimonial image URL(s).", updated);
        }
    }

    private Testimonial testimonial(String name, String quote, String imageUrl, int order) {
        return Testimonial.builder()
                .name(name)
                .quote(quote)
                .imageUrl(imageUrl)
                .rating(5)
                .order(order)
                .build();
    }

    private void seedPages() {
        if (pageContentRepository.count() > 0) {
            log.info("Page content already seeded, skipping.");
            return;
        }

        pageContentRepository.saveAll(List.of(
                transformationPage(),
                solutionPage(),
                servicesPage(),
                industriesPage(),
                valuesPage(),
                careersPage(),
                aboutPage()
        ));
        log.info("Seeded page content.");
    }

    private PageContent transformationPage() {
        return PageContent.builder()
                .slug("transformation")
                .title("Transformation and Innovation")
                .summary("Step into the future with our Technology and Innovation hub. We're reshaping learning to enhance roles over just skills.")
                .pillars(List.of(
                        "Learning and Development",
                        "Talent Empowerment",
                        "Skills Profiling",
                        "Fusion of Theory and Lab",
                        "Training Model"
                ))
                .sections(List.of(
                        section(null,
                                "Step into the future with our Technology and Innovation hub. We're reshaping learning to enhance roles over just skills. Our mission? Empowering talent through hands-on experiences preparing for ever-changing environments. Discover our approach to skills profiling, ensuring the perfect fit for every role. We blend theory and practice, giving you real-world problem-solving skills. Our flexible training model suits all learning styles, forging lasting connections for success. Join us in the journey to transform how we innovate and develop talent.",
                                null),
                        section("Learning and Development: Pioneering Innovation in Education",
                                "In today's fast-paced world, the landscape of learning and development is rapidly evolving. We stand at the forefront of this evolution, challenging traditional norms and embracing advanced technologies like Artificial Intelligence (AI) and Machine Learning (ML) to reshape the educational experience fundamentally.\n\nImagine a future where learning is not bound by conventional constraints but is instead a dynamic, interactive journey. Our vision extends beyond the mere acquisition of skills; we seek to revolutionize the very essence of learning itself. By integrating AI and ML, we unlock new possibilities for efficiency and effectiveness in education, ensuring that individuals are equipped to navigate the complexities of the modern world.\n\nEmbark on a transformative journey where innovation is the driving force behind every educational endeavor. Together, let's redefine the boundaries of learning and development, empowering individuals to realize their full potential in both their personal and professional lives.",
                                "/img/subpage/transformation1.png"),
                        section("Talent Empowerment: Cultivating Excellence in Every Individual",
                                "At the heart of our mission lies a deep commitment to empowering talent and unlocking human potential. We recognize that true excellence is not just about possessing skills but about embracing a mindset of continuous growth and adaptability. Through immersive experiences and hands-on learning opportunities, we cultivate talent that thrives in the face of adversity and change.\n\nOur approach is not limited to the acquisition of technical skills; we believe in nurturing well-rounded individuals who possess a diverse range of abilities. From digital literacy to emotional intelligence, we provide individuals with the tools they need to succeed in today's ever-evolving landscape.\n\nRedefining the way we approach talent empowerment, let's shape a future where every individual has the opportunity to unleash their unique talents and make a meaningful impact on the world.",
                                "/img/subpage/trans2.jpg"),
                        section("Skills Profiling: Unlocking the Full Spectrum of Human Potential",
                                "In a world where talent is often overlooked or underestimated, we strive to redefine the way individuals are evaluated and assessed. We understand that each person possesses a unique combination of skills, experiences, and strengths that contribute to their overall value.\n\nThrough our holistic approach to skills profiling, We aim to assess and address all the three spectrum of talent characteristics SKILL(s), LEVEL & ROLE to uncover the full spectrum of human potential and match individuals with opportunities that align with their abilities and aspirations.",
                                null),
                        section("Fusion of Theory and Lab: Bridging the Gap Between Knowledge and Implementation",
                                "In the pursuit of mastery, theory alone is not enough. Practical experience and real-world application are essential components of true learning and understanding. That's why we place a strong emphasis on bridging the gap between theory and practice, providing individuals with the opportunity to apply their knowledge in meaningful and impactful ways.\n\nThrough hands-on labs, interactive workshops, and immersive simulations, we create environments where learning comes to life. Participants exercise, experiment, innovate, and problem-solve, gaining valuable insights that cannot be obtained through textbooks alone.",
                                "/img/subpage/trans3.png"),
                        section("Training Model: Fostering Meaningful Connections Through Dynamic Learning Experiences",
                                "In a world where information is abundant and attention spans are short, traditional training models no longer suffice. We believe in a more dynamic and interactive approach to learning, one that fosters meaningful connections and drives sustainable outcomes.\n\nOur training model is built on the principles of engagement, collaboration, and empowerment to drive efficacy and effectiveness. Coining \"The Training Factory\", where knowledge acquisition is through In-Person classroom sessions, state-of-the-art labs, mentored by designated coaches, following continuous learning & assessment. From interactive workshops to virtual simulations, our training programs are designed to inspire and ignite a passion for learning.",
                                "/img/subpage/trans4.png")
                ))
                .build();
    }

    private PageContent solutionPage() {
        return PageContent.builder()
                .slug("solution")
                .title("Solution")
                .summary("Explore our Solutions hub, where we tackle the complex challenges of talent acquisition and development in today's dynamic business landscape.")
                .pillars(List.of(
                        "Resource Acquisition",
                        "Profiling",
                        "Transformative Learning & Development",
                        "Assessment",
                        "Deployment"
                ))
                .sections(List.of(
                        section(null,
                                "In today's dynamic business environment, talent acquisition and development present numerous hurdles, from unmet demands to escalating costs and attrition rates. The shortage of quality talent, coupled with the demand for multi-skilled individuals, adds complexity to hiring processes.\n\nTraditional training methods often fail to resonate with millennials, exacerbating the gap between skills and role development. This disconnect leads to disproportionate workloads, productivity drops, and operational risks.\n\nMoreover, the rapid pace of technological change compounds these challenges, requiring organizations to adapt quickly. Failure to address these issues results in revenue leakage, increased costs, and customer dissatisfaction.\n\nTo thrive in this landscape, organizations must shift from skill enhancement to holistic role development. By standardizing roles, investing in hands-on learning, and embracing a comprehensive talent management approach, businesses can mitigate risks, drive productivity, and ensure readiness for the future.",
                                null),
                        section("Resource Acquisition",
                                "Our strategy for acquiring resources focuses on tapping into talent pools in lesser-explored cities and regions abundant with potential. By conducting comprehensive assessments of their IT proficiency, knowledge, competencies, and inclinations, we add value to our employees by facilitating their career advancement and talent development, ensuring they are equipped for both present and future challenges.",
                                null),
                        section("Profiling",
                                "Through our holistic approach to skills profiling, we aim to assess and address all the three spectrum of talent characteristics SKILL(s), LEVEL & ROLE, enabling us to assign tailored learning and development tracks. By targeting an end-state production-ready map, we streamline career planning for our employees. Moreover, standardizing roles, skills, and levels enhances clarity and direction for professional growth.",
                                null),
                        section("Transformative Learning & Development",
                                "Our transformative learning and development initiatives encompass an extensive training program conducted through our \"Training Factory.\" This program focuses on technical and role development through practical labs, simulations, and projects, ensuring the creation of production-ready talent. Participants gain hands-on expertise covering operations hygiene, collaboration, service level management, setting a solid foundation for success",
                                null),
                        section("Assessment",
                                "Continuous assessment is integral to our training process, featuring exercises, unit tests, and comprehensive evaluations of technical skills, role, and lab performance. Panel assessments provide invaluable insights into role, skill, and level mapping, while industry-standard certifications validate proficiency. Transparent client-trainee communication ensures alignment and mutual understanding throughout the assessment process.",
                                null),
                        section("Deployment",
                                "Our deployment models are flexible and tailored as per organizations demand from dedicated, designated, flexi models. By bringing in focused governance, we aim to deliver an unmatched customer experience by building capability and capacity.",
                                null)
                ))
                .build();
    }

    private PageContent servicesPage() {
        return PageContent.builder()
                .slug("services")
                .title("Services")
                .summary("Our Services prioritizes building role-ready talent across industries, catering to both fresher and experienced professionals alike.")
                .pillars(List.of(
                        "Role Ready Freshers",
                        "Role Ready Experienced",
                        "Leadership Development",
                        "Bench Talent Development",
                        "Lab-as-a-Service"
                ))
                .sections(List.of(
                        section(null,
                                "As we expand our Services Portfolio, our primary focus is on prioritizing solutions that effectively address the current challenges prevalent across various industries. While we continuously develop additional offerings, our initial suite of services is meticulously designed to cultivate role-ready talent across diverse industries, catering to both entry-level individuals and seasoned professionals.\n\nOur dedication to excellence encompasses not only individual skill enhancement but also extends to leadership and bench talent development, ensuring a comprehensive approach to talent management.\n\nIn our lab, we offer more than just services – we provide customized Lab-as-a-Service solutions tailored to meet industry demands. Our state-of-the-art resources and facilities offer hands-on learning and development opportunities.",
                                null),
                        section("Role-Ready Freshers",
                                "We collaborate with reputable institutes to nurture talent during their academic journey. Through a rigorous assessment process, they are trained in designated technology roles while pursuing their studies. Upon completing their graduation/post-graduation, they undergo additional training to reach L1+ proficiency level before deployment.",
                                null),
                        section("Role-Ready Experienced",
                                "We undertake extensive hiring and onboarding processes for talent from underexplored geographies with relevant capabilities. We assess their current skill, level, and role proficiencies and assign tailored learning plans. Following over two months of intensive technical skill and role development alongside hands-on lab practice, they attain L2 proficiency level before deployment.",
                                null),
                        section("Leadership Development",
                                "We recognize that effective leadership is essential for organizational growth and success. Our leadership development programs focus on transforming young managers and leaders into capable and efficient business leaders, covering various aspects such as customer relations, operations, personnel management, and financial acumen.",
                                null),
                        section("Bench Talent Development",
                                "A well-stocked bench is crucial for seamless workforce management. However, managing bench talent presents inherent challenges. Our services aim to address these challenges by preparing bench resources to be role and production-ready through transformative learning and development programs.",
                                null),
                        section("Lab-as-a-Service",
                                "We establish cutting-edge technical labs to provide hands-on knowledge and practical experience. Extending these labs to our customers, we offer tailored Lab-as-a-Service solutions, providing access to resources that facilitate practical learning and development.",
                                null)
                ))
                .build();
    }

    private PageContent industriesPage() {
        return PageContent.builder()
                .slug("industries")
                .title("Industries: Building Talent Across Industry Verticals")
                .summary("Our mission is to cultivate Role-Ready talent across diverse industry verticals, equipping professionals with the requisite technical expertise and knowledge to thrive.")
                .pillars(List.of(
                        "IT",
                        "Banking & Financial Services",
                        "Life Sciences & Healthcare",
                        "Communication, Media & Entertainment",
                        "Transportation",
                        "Manufacturing & Logistics",
                        "Supply Chain",
                        "Energy & Utilities"
                ))
                .sections(List.of(
                        section(null,
                                "The scarcity of suitable talent is a widespread challenge across industries. With a talent marketplace characterized by intense competition, addressing the prevailing skill gap has become imperative. Our mission is to cultivate Role-Ready talent across diverse industry verticals, equipping professionals with the requisite technical expertise and knowledge to thrive in today's rapidly evolving landscape. Our comprehensive learning and development model is intricately tailored to meet the distinctive challenges and demands of each sector, ensuring that professionals are adequately prepared to spearhead innovation and drive success in their respective domains.",
                                null),
                        section("IT Industry",
                                "NATTLABS embarks on its journey with a modest focus on nurturing Role & Production ready talent within the IT industry initially, with plans to expand into other industry verticals as we evolve and mature. In the realm of IT, our Role-ready programs are meticulously curated to foster individuals with versatile skills, role development capabilities, access to labs, and essential knowledge necessary for success in dynamic IT environments (Data Centre, Cloud, Network, Security, Dev Ops, SAP, End-User Computing, Service Management, Tools, among others). From analysts to administrators, developers to specialists, our solutions cater to a diverse array of roles.",
                                null),
                        section("Expanding Across Verticals",
                                "Similarly, we are developing comparable Role-Ready talent programs for various industry verticals including Banking & Financial Services, Life Sciences & Healthcare, Communication, Media & Entertainment, Transportation, Manufacturing & Logistics, Supply Chain, Energy & Utilities, and beyond.",
                                null)
                ))
                .build();
    }

    private PageContent valuesPage() {
        return PageContent.builder()
                .slug("values")
                .title("Values")
                .summary("At NATTLABS, our core values of honesty, integrity, and humanity serve as the foundation of everything we do.")
                .pillars(List.of("Honesty", "Integrity", "Humanity"))
                .sections(List.of(
                        section(null,
                                "At NATTLABS, our core values of honesty, integrity, and humanity serve as the foundation of everything we do. These values are not just words; they are guiding principles that shape our actions and define our culture. These values drive us towards our ultimate goal: to create joy, happiness, fulfillment, accountability, and ethics in all our endeavors. With honesty, integrity, and humanity as our compass, we navigate the complexities of the world with purpose and conviction, making a positive impact in every direction we go.",
                                null),
                        section("Honesty",
                                "Honesty is our guiding star, illuminating the path of transparency and reliability in all our interactions. We believe in being forthright and truthful, fostering trust and credibility with our stakeholders at every turn.",
                                null),
                        section("Integrity",
                                "Upholding integrity is paramount to us, ensuring fairness and accountability in every decision we make. We hold ourselves to the highest ethical standards, striving to do what is right even when no one is watching.",
                                null),
                        section("Humanity",
                                "Humanity lies at the heart of our environment, where diversity and collaboration flourish, and every individual feels valued and respected. We celebrate our differences and recognize the unique contributions that each person brings to our team.",
                                null)
                ))
                .build();
    }

    private PageContent careersPage() {
        return PageContent.builder()
                .slug("careers")
                .title("Careers")
                .summary("At NATTLABS, we offer more than just a job – we offer a journey of growth, opportunity, and fulfillment.")
                .pillars(List.of("Growth", "Opportunity", "Diversity", "Innovation"))
                .sections(List.of(
                        section(null,
                                "At NATTLABS, we offer more than just a job – we offer a journey of growth, opportunity, and fulfillment. We believe in welcoming individuals from all backgrounds and disciplines, fostering an inclusive environment where everyone can thrive.\n\nWhether you're just starting out in your career or have years of experience under your belt, we provide the resources and support you need to succeed. We recognize that diversity drives innovation, which is why we value individuals from diverse backgrounds and perspectives. At NATTLABS, there's a place for everyone – a place where your unique talents and contributions are celebrated and valued.\n\nJoin us and be part of a team that values diversity, fosters innovation, and drives positive change in the world. Whether you're passionate about technology, creativity, or making a difference in people's lives, there's a place for you here at NATTLABS.",
                                null),
                        section("Contact",
                                "Reach us at: " + ContactInfoConstants.CAREERS_EMAIL,
                                null)
                ))
                .build();
    }

    private PageContent aboutPage() {
        return PageContent.builder()
                .slug("about")
                .title("About Us")
                .summary("At NATTLABS, we transcend the way learning and development is exercised from past few decades, revolutionizing and reshaping the very essence of skill development for generations to come.")
                .pillars(List.of(
                        "Global Expansion",
                        "Leadership",
                        "Industry Mentorship",
                        "Social Impact",
                        "Corporate Social Responsibility"
                ))
                .sections(List.of(
                        section(null,
                                "At NATTLABS, we transcend the way learning and development is exercised from past few decades, revolutionizing and reshaping the very essence of skill development for generations to come. In the vast expanse of learning and development, we emerge as a dynamic force, fueled by the visionary leadership of our founders.\n\nOur mission is clear: to revolutionize talent development at its core. With unwavering determination, we strive to rank among the top 3 Global Learning & Development organizations. Our ambition is bold yet straightforward: to cultivate Talent Ready for Roles & Productions through transformative learning that transcends conventional boundaries.\n\nIn our vision of the future, individuals and businesses not only adapt but thrive in the dynamic digital era, armed with skills and roles that redefine success. We confront the pragmatic challenges facing businesses today: unmet talent demands, prolonged lead times, escalating hiring costs, attrition, scarcity of quality talent, and the imperative for multi-skills and digital expertise.\n\nThese challenges reverberate across industries, leading to revenue dilution, margin loss, customer dissatisfaction, and operational inefficiencies. As NATTLABS, we stand resolute, committed to confronting these obstacles head-on, illuminating the path towards a brighter future in talent development. Our resolve is unwavering as we forge ahead, transforming challenges into opportunities and shaping a world where talent thrives and innovation reigns supreme.",
                                null),
                        section("Global Expansion",
                                "As NATTLABS continues to redefine the landscape of talent development, our sights are set on a global horizon. We envision a future where we want to make our presence in all the potential geographies.\n\nCentral to our global expansion strategy is the establishment of major Learning & Development centers not only across India but also in key international locations. These centers will serve as beacons of innovation, offering state-of-the-art training programs and pioneering initiatives designed to equip individuals with the skills and knowledge needed to excel in today's rapidly evolving world.\n\nOur commitment to skill enhancement knows no bounds. Through strategic partnerships and collaborative efforts, we aim to elevate the overall skill landscape not just within India but across diverse geographies. By fostering a culture of continuous learning and growth, we aspire to empower individuals from all corners of the globe to unlock their full potential and drive meaningful change in their respective industries.\n\nAt NATTLABS, we recognize that the challenges and opportunities of the digital age are universal. As we embark on this journey of global expansion, our mission remains unwavering: to revolutionize talent development on a global scale and pave the way for a future where success knows no boundaries. Together, we will shape a world where individuals and businesses alike thrive in an era of limitless possibilities.",
                                null),
                        section("The Leadership Behind Us",
                                "Arvind is a seasoned Business & Delivery leader with over three decades of dedication in the IT industry. His entrepreneurial mindset has driven transformative change, from establishing businesses to orchestrating transitions and transformations. Arvind's leadership extends to nurturing strong leaders, fostering motivation, and championing organizational change with strategic vision.\n\nThroughout his career, Arvind has led global engagements, modernizing organizations through cloud enablement, automation, and IT transformation programs. His expertise in organizational design and strategic vision has reshaped paradigms, driving efficiencies and value.\n\nHis global impact transcends borders, seamlessly managing diverse workforces and global delivery centers. His focus on continuous training ensures teams remain adept with NexGen and Digital Skills, navigating the IT landscape with agility.\n\nArvind envisions NATTLABS as a trailblazer in learning and development, empowering individuals and organizations globally. His vision aims to redefine talent development standards, fostering innovation and excellence across industries. With a focus on continuous learning, Arvind aims to equip individuals from all backgrounds with the tools they need to succeed in a dynamic landscape. His vision for NATTLABS is inclusive, empowering, and transformative, shaping a future where talent knows no boundaries.",
                                null),
                        section("Harnessing Industry Leadership",
                                "NATTLABS thrives with the support & mentoring of industry leaders from various fields, bringing over 500 years of combined experience. Their insights and expertise play a pivotal role in establishing NATTLABS as a leading force in learning and development.\n\nTheir guidance shapes our path forward, helping us navigate the complexities of the industry with clarity and purpose. With their wealth of knowledge, they inspire our team to innovate and excel, pushing boundaries in talent development.\n\nTheir commitment to excellence fuels our ambition, driving us to redefine standards in the field. Their support is the foundation of our success, empowering us to lead the way in transforming how people learn and grow.",
                                null),
                        section("Creating Impact: Transforming Lives and Industries",
                                "At NATTLABS, our initiatives are not just about business; they're about making a meaningful impact on people's lives and driving positive change across industries. Through our strategic approaches, we aim to empower individuals and foster economic growth while addressing societal challenges.\n\nEmpowering Underleveraged Geographies: We believe in the untapped potential of Tier 2, 3, and 4 cities across India. These regions are teeming with talent and ambition, ready to contribute to the country's growth story. By focusing our hiring and development efforts here, we're not only filling positions but also catalyzing economic development, bridging urban-rural disparities, and embracing diverse perspectives within our organization.\n\nA Comprehensive and Inclusive Hiring Approach: Our hiring strategy is grounded in inclusivity and rigor. We seek individuals who not only possess the necessary skills and experience but also demonstrate a strong appetite for learning and growth. Our meticulous selection process ensures that we bring on board diverse talent capable of driving innovation and fostering a culture of excellence.\n\nProactive and On-Demand Hiring: By adopting a proactive and on-demand hiring philosophy, we stay ahead of industry trends and respond swiftly to client needs. Anticipating skills shortages and evolving demands, we position ourselves as key players in the talent ecosystem, ready to address the evolving needs of industries across the globe.\n\nGlobal Ambitions: While our focus is on strengthening our roots in India, our aspirations extend far beyond borders. The talent, skills, and infrastructure we cultivate here serve as the foundation for our global expansion endeavors. By bringing our unique value proposition to clients and communities worldwide, we aim to leave a lasting imprint on the global landscape, driving innovation and transformation across industries.\n\nAt NATTLABS, our commitment to creating impact goes beyond business metrics; it's about shaping a brighter future for individuals, industries, and communities alike. Through our concerted efforts, we strive to be catalysts for positive change, empowering people to realize their full potential and driving sustainable growth across diverse sectors.",
                                null),
                        section("Empowering Communities: Our Commitment to Corporate Social Responsibility",
                                "At NATTLABS, we recognize our responsibility to drive positive change beyond the realms of business. Our Corporate Social Responsibility (CSR) initiatives are deeply rooted in our ethos, reflecting our dedication to creating a more inclusive and equitable society.\n\nHiring from Underprivileged Geographies: A cornerstone of our CSR strategy is our commitment to tapping into the vast potential of underprivileged geographies, particularly Tier 2, 3, and 4 cities across India. These regions, often marginalized and overlooked, harbor immense talent and ambition waiting to be unlocked. By focusing our hiring and development efforts here, we aim to not only fill positions but also foster economic empowerment and reduce urban-rural disparities.\n\nThrough targeted recruitment drives and skill development programs, we provide opportunities for individuals from underprivileged backgrounds to thrive and contribute meaningfully to India's growth story. By offering employment opportunities and investing in their professional development, we aspire to break down barriers and create pathways to success for those who need it most.\n\nOur commitment to hiring from underprivileged geographies goes beyond altruism; it is a testament to our belief in the transformative power of opportunity. By harnessing the talents and potential of individuals from diverse backgrounds, we not only enrich our organization but also contribute to the larger goal of building a more inclusive and sustainable society.\n\nAt NATTLABS, we understand that our success is intricately linked to the well-being of the communities we serve. Through our CSR initiatives, we strive to make a meaningful impact, one hire at a time, as we work towards a future where everyone has the opportunity to thrive and succeed.",
                                null),
                        section("Get In Touch",
                                ContactInfoConstants.ADDRESS + "\n" + ContactInfoConstants.PHONE + "\n" + ContactInfoConstants.SUPPORT_EMAIL,
                                null)
                ))
                .build();
    }

    private ContentSection section(String heading, String body, String imageUrl) {
        return ContentSection.builder()
                .heading(heading)
                .body(body)
                .imageUrl(imageUrl)
                .build();
    }
}
