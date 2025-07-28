import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

export default function ContactUs() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url('/contact.jpg')` }}
    >
      <div className="w-full max-w-xl bg-white/80 rounded-3xl shadow-2xl p-10 backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          We'd love to hear from you!
        </p>
        <form className="space-y-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your email" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." rows={4} />
          </div>
          <Button type="submit" className="w-full mt-2">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
