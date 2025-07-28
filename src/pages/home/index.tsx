import {
  Clock,
  Layers,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
  Target,
  Hospital, 
  Users
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const items = [
  {
    icon: Clock,
    title: "Early Detection",
    description: "OCT imaging enables detection of retinal pathologies and cardiovascular diseases in their preclinical stages, often before symptoms manifest, dramatically improving treatment success rates and patient prognosis.",
    color: "#4F87FF"
  },
  {
    icon: TrendingUp,
    title: "Enhanced Diagnostic Precision",
    description: "Advanced deep learning algorithms identify subtle morphological patterns and microstructural changes that may escape human detection, reducing diagnostic uncertainty and improving clinical decision-making.",
    color: "#3AB83A"
  },
  {
    icon: Zap,
    title: "Clinical Efficiency",
    description: "Automated AI analysis reduces image interpretation time from hours to minutes, enabling higher patient throughput and faster treatment initiation while maintaining diagnostic excellence.",
    color: "#3172FF"
  }
]

const author = [
  {
    name: "Tran Dinh Son",
    role: "CEO & Founder",
    description: "Vitreoretinal Specialist • 15+ years in retinal imaging • Harvard Medical School",
    image: "https://sonai.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg-son.a8d54977.webp&w=828&q=75"
  },
  {
    name: "Tran Phong Phu",
    role: "AI Innovator",
    description: "Computer Vision & Deep Learning • MIT • 50+ peer-reviewed publications",
    image: "https://sonai.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg-robot.e8eda76b.png&w=640&q=75"
  },
  {
    name: "Thai Viet Lap",
    role: "AI Engineer",
    description: "Medical Image Processing • Stanford University • FDA regulatory expert",
    image: "https://sonai.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg-duy.16a53078.png&w=256&q=75"
  }
]

export default function HomePage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    // <motion.div
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.6 }}>

    <div className="w-full mt-12">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col items-center justify-start">

        <div className="flex flex-col gap-20">
          {/* bat dau section1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center justify-between">
            <div className="gap-6 flex flex-col items-start justify-start">
              <p className="inline-block py-1 px-3 rounded-md text-bold font-medium bg-[#4F87FF]/20 text-[#4F87FF]">
                [New] OCT Image - View Demo
              </p>

              <h1 className="md:text-4xl text-3xl lg:text-5xl font-bold leading-tight ">
                AI-Powered <span className="text-[#4F87FF]">OCT Analysis</span>
                <br />for Precision Medicine
              </h1>

              <p className="md:text-xl text:md leading-relaxed">
                Advanced artificial intelligence system that revolutionizes Optical Coherence Tomography image analysis,
                delivering enhanced diagnostic accuracy and clinical efficiency for ophthalmologists, cardiologists, and medical professionals worldwide.
              </p>

              <div className="flex gap-4">
                <Button onClick={()=>scrollToSection("demo")} className="px-8 py-2 bg-[#4F87FF] hover:bg-[#000] " >Try Demo</Button>
                <Button variant="outline" className="px-8 " >Learn More </Button>


              </div>

            </div>

            <div className="flex items-center justify-center md:max-h-96 max-h-80 overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://i.pinimg.com/736x/6b/3c/1f/6b3c1fbf504558ed255b5d167107627c.jpg  "
                alt="OCT Image"
                className="rounded-2xl shadow-2xl w-full "
              />
            </div>
          </div>
          {/* end section1 */}
        {/* About the Project */}
        <section id="about" className="py-20 bg-gray-50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            > */}
            <div className="w-full mt-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">About the Project</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advancing medical diagnostics through cutting-edge artificial intelligence and computer vision technologies.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://pixabay.com/get/g84df93dfd6e34c3f2ca943675fb534c84d4ce4eac29fabf1aa1967c6a7f0bce57dae6b936a5d58d297320a531bec1a13a83169604b1f9579ae34850290783824_1280.jpg" 
                  alt="Medical professional analyzing diagnostic images" 
                  className="rounded-xl shadow-lg w-full" 
                />
              </motion.div> */}
              <div>
                <img 
                  src="https://pixabay.com/get/g84df93dfd6e34c3f2ca943675fb534c84d4ce4eac29fabf1aa1967c6a7f0bce57dae6b936a5d58d297320a531bec1a13a83169604b1f9579ae34850290783824_1280.jpg" 
                  alt="Medical professional analyzing diagnostic images" 
                  className="rounded-xl shadow-lg w-full" 
                />
              </div>

              <div className="space-y-6">
                {/* Block 1 */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Target className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Mission</h3>
                    <p className="text-gray-600">
                      Develop a cutting-edge AI system that automatically analyzes OCT images to detect retinal diseases and cardiovascular conditions with high accuracy.
                    </p>
                  </div>
                </div>

                {/* Block 2 */}
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Hospital className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Clinical Applications</h3>
                    <p className="text-gray-600">
                      Applications in ophthalmology for early detection of diabetic retinopathy, macular degeneration, and glaucoma. Also supports intravascular OCT in cardiology.
                    </p>
                  </div>
                </div>

                {/* Block 3 */}
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Users className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Target Users</h3>
                    <p className="text-gray-600">
                      Ophthalmologists, cardiologists, radiologists, residents, and healthcare providers aiming for precise diagnosis and optimized workflows.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


          {/* bat dau section2 */}
          <div>
            <div className="">

              <div className="flex flex-col gap-8 items-center justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold">Why It Matters</h2>
                <p className="text-xl max-w-3xl mx-auto">
                  The critical role of AI-assisted OCT analysis in modern healthcare and patient outcomes
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((item, idx) => (
                    <Card className="h-full" key={idx}>
                      <CardContent className="p-6">
                        <div className={`bg-${item.color}/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                          <item.icon className={`text-[${item.color}] text-xl`} />
                        </div>
                        <h3 className="text-xl font-semibold text-dark-text mb-3">{item.title}</h3>
                        <p className="text-medium-text">{item.description}</p>
                      </CardContent>
                    </Card>

                  ))}


                </div>
                <Card className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-dark-text mb-4">Global Healthcare Impact</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#4F87FF] rounded-full"></div>
                          <span className="text-medium-text">463 million people worldwide at risk for diabetic retinopathy complications</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#3AB83A] rounded-full"></div>
                          <span className="text-medium-text">Early AI-assisted detection prevents 95% of severe vision loss cases</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#3172FF] rounded-full"></div>
                          <span className="text-medium-text">Automated screening reduces healthcare costs by up to 60% while improving access</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center md:max-h-96 max-h-80 overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src="https://i.pinimg.com/736x/eb/c3/21/ebc321357aa9f3c526fd6a7f91802a09.jpg"
                        alt="Global healthcare network and medical data visualization"
                        className="rounded-xl shadow-lg w-full"
                      />
                    </div>
                  </div>
                </Card>
              </div>



            </div>
          </div>
          {/*ket thuc section 2  */}

          {/* bat dau section3 */}
          <div>
            <Card className="p-8 bg-light-gray">
              <h3 className="text-2xl font-bold mb-8 text-center">Core Technologies</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#4F87FF]/10 p-3 rounded-lg mr-4">
                      <Search className="text-[#4F87FF] text-xl" />
                    </div>
                    <h4 className="text-xl font-semibold text-dark-text">YOLO</h4>
                  </div>
                  <p className="text-medium-text mb-4">
                    State-of-the-art real-time object detection algorithm for precise identification and localization of pathological features,
                    drusen deposits, hemorrhages, and anatomical landmarks in OCT images. Custom-trained with medical imaging datasets
                    and optimized anchor boxes for retinal pathology detection.
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-success-green/10 p-3 rounded-lg mr-4">
                      <Layers className="text-success-green text-xl" />
                    </div>
                    <h4 className="text-xl font-semibold text-dark-text">U-Net Architecture</h4>
                  </div>
                  <p className="text-medium-text mb-4">
                    Advanced convolutional neural network architecture optimized for pixel-perfect segmentation of retinal tissue layers,
                    intraretinal fluid accumulations, subretinal deposits, and precise anatomical boundary delineation in high-resolution OCT scans.
                    Features encoder-decoder design for medical image analysis.
                  </p>
                </Card>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-medical-blue">95.7%</div>
                  <div className="text-medium-text">Diagnostic Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-green">&lt;30s</div>
                  <div className="text-medium-text">Processing Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-deep-blue">30K+</div>
                  <div className="text-medium-text">Training Images</div>
                </div>
              </div>
            </Card>
          </div>
          {/* ket thuc section3 */}

          {/* section 4 - view demo section  */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {author.map((member, index) => (
              <div key={index} className="flex flex-col justify-between">
                <img
                  src={member.image}
                  alt={`Professional headshot of ${member.name}`}
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-lg self-start"
                />
                <h3 className="text-xl font-semibold text-dark-text mb-1">{member.name}</h3>
                <p className="text-medical-blue font-medium mb-2">{member.role}</p>
                <p className="text-medium-text text-sm">{member.description}</p>
              </div>
            ))}
          </div>

          {/* something else */}
          <section className="relative w-full h-[400px] bg-gradient-to-r from-[#8b8b8b] to-[#505050] overflow-hidden rounded-2xl shadow-2xl my-12" id="demo">
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                <span className="uppercase text-sm tracking-wide text-yellow-200">
                  Demo trực tiếp
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-xl">
                Xem demo của chúng tôi ngay
              </h2>
              <p className="text-lg md:text-xl mb-6 max-w-2xl text-gray-200">
                Trải nghiệm công nghệ AI trong phân tích OCT, hỗ trợ bác sĩ chẩn đoán nhanh chóng và chính xác.
              </p>

              <Link
                to="/demo"
                className="bg-white text-black px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:scale-105 duration-300"
              >
                Truy cập trang demo
              </Link>
            </div>
          </section>
        </div>



      </div>
    </div>

    // </motion.div>

  );
}
