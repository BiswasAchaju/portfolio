"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";



const contactData = {
  name: "Suman Acharya",
  post: "Full Stack Web Developer",
  description: "I am available for freelance work. Connect with me via phone or email.",
  contact: {
    phone: "+977 9815029324",
    email: "acharyas186@gmail.com",
    address: "Kathmandu, Nepal",
  },
  socialLinks: [
    { href: "https://facebook.com", icon: "Facebook" },
    { href: "https://instagram.com", icon: "Instagram" },
    { href: "https://linkedin.com", icon: "Linkedin" },
  ],
  mapIframeSrc:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7065.381450332762!2d85.38126250000002!3d27.6959522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1732846153171!5m2!1sen!2snp",
};



const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const { name, post, description, contact, socialLinks, mapIframeSrc } = contactData;

  return (
    <section className="container px-4 mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 space-y-2"
      >
        <h2 className="text-4xl font-bold font-josefin tracking-tight text-[#FF014F]">
          Contact Me
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl p-8 shadow-lg"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="text-muted-foreground">{post}</p>
            <p className="text-muted-foreground">{description}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="text-[#FF014F]" />
                <a href={`tel:${contact.phone}`} className="hover:underline">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-[#FF014F]" />
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-[#FF014F]" />
                <span>{contact.address}</span>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm uppercase mb-4 text-muted-foreground">
                FIND WITH ME
              </h4>
              <div className="flex gap-4">
                {socialLinks.map(({ href, icon }, index) => {
                  const IconComponent = { Facebook, Instagram, Linkedin }[icon];
                  return (
                    <motion.a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:border-[#FF014F] transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden mt-8 shadow-md">
            <iframe
              src={mapIframeSrc}
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl p-8 shadow-lg"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="YOUR NAME"
                          {...field}
                          className="bg-card border-border h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="PHONE NUMBER"
                          {...field}
                          className="bg-card border-border h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="EMAIL"
                        type="email"
                        {...field}
                        className="bg-card border-border h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="SUBJECT"
                        {...field}
                        className="bg-card border-border h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="YOUR MESSAGE"
                        {...field}
                        className="bg-card border-border min-h-[150px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-[#FF014F]"
              >
                {isSubmitting ? "Sending..." : "SEND MESSAGE"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
