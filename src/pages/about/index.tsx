import { Card, CardContent } from "../../components/ui/card";

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-16 space-y-16">
        {/* Section 1: Heading */}
        <section className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            About OCT Image AI
          </h1>
          <p className="text-gray-600 text-lg">
            Empowering clinicians through AI-powered OCT interpretation.
          </p>
        </section>

        {/* Section 2: Vision & Technology */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Vision</h2>
            <p className="text-gray-600">
              We believe that AI can revolutionize the way cardiovascular
              diseases are diagnosed. By combining state-of-the-art deep
              learning with real-world clinical data, our goal is to assist
              physicians in making faster and more accurate decisions.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Technology</h2>
            <p className="text-gray-600">
              Our system leverages advanced models such as YOLO, UNet, and
              Transformer-based architectures. We support OCT TIF image
              processing, multi-task prediction (lumen, stent, guidewire), and
              real-time rendering with AI-enhanced clarity.
            </p>
          </div>
        </section>

        {/* Section 3: Team */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-primary">Meet the Team</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our multidisciplinary team blends expertise in AI, medicine, and
            engineering to bring cutting-edge OCT analysis to clinics worldwide.
          </p>
        </section>

        {/* Section 4: Members */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <Card key={index} className="flex flex-col items-center py-6 hover:shadow-lg transition-transform hover:-translate-y-1">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 object-cover shadow-md"
              />
              <CardContent className="text-center space-y-1">
                <p className="text-lg font-semibold">{member.name}</p>
                <p className="text-gray-500">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}

const members = [
  {
    name: "Tran Dinh Son",
    role: "CEO & Founder",
    image:
      "https://sonai.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg-son.a8d54977.webp&w=828&q=75",
  },
  {
    name: "Tran Phong Phu",
    role: "AI Innovator",
    image:
      "https://sonai.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg-robot.e8eda76b.png&w=640&q=75",
  },
  {
    name: "Thai Viet Lap",
    role: "AI Engineer",
    image:
      "https://sonai.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg-duy.16a53078.png&w=256&q=75",
  },
];
