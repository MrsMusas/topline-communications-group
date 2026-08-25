/**
 * TLCG design note: Verdant Ledger uses an asymmetric editorial procession,
 * protected official logo placement, ivory reading fields, and restrained gold lines.
 */
import { ArrowDownRight, ArrowUpRight, AtSign, BarChart3, CalendarDays, Globe2, MapPin, Menu, Phone, Presentation, UserRound, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { navigationSections, sectionIdForPath } from "@/lib/sectionRoutes";


const OFFICIAL_LOGO = "/assets/tlcg/LogoGoldMonograme_c7731889.png";
const HERO_IMAGE = "/assets/tlcg/tlcg-hero-verdant_a29c23f4.jpg";
const EXPERIENCE_IMAGE = "/assets/tlcg/tlcg-experience-human_978593af.jpg";
const APPROACH_IMAGE = "/assets/tlcg/pasted_file_PbUGqO_image_540cd03e.png";
const CONTACT_PORTRAIT = "/assets/tlcg/pasted_file_ApU5WI_image_bd8042d3.png";
const EXPERIENCE_EVENT_STILLS = [
  { src: "/assets/tlcg/tlcg-malaysia-event-scale_be9e1a35.webp", alt: "Corporate event experience: full-room scale prepared for guests" },
  { src: "/assets/tlcg/tlcg-malaysia-event-production_0bda992c.webp", alt: "Event production and gifting preparation for a corporate experience" },
  { src: "/assets/tlcg/tlcg-malaysia-venue-arrival_0b897b23.webp", alt: "Venue arrival and guest experience setting" },
  { src: "/assets/tlcg/tlcg-malaysia-outdoor-installation_09175222.webp", alt: "Outdoor event installation and guest experience" },
  { src: "/assets/tlcg/tlcg-malaysia-tablescape-detail_a92bce09.webp", alt: "Hospitality detail for an event experience" },
];


const capabilityItems = [
  { number: "01", name: "Marketing", note: "Help organisations build visibility, communicate their value and connect with the right audiences." },
  { number: "02", name: "Communications", note: "Help organisations communicate clearly, consistently and strategically with the people who matter." },
  { number: "03", name: "Events & Experiences", note: "Plan and execute corporate events, launches, awards, incentives and experiences that achieve a clear purpose." },
  { number: "04", name: "Digital Marketing", note: "Content strategy, LinkedIn, social media campaigns, AI-powered workflows and marketing automation." },
  { number: "05", name: "Customer Engagement", note: "Customer experience, CRM journeys, onboarding campaigns and retention communications." },
  { number: "06", name: "Fractional Leadership", note: "Supporting organizations that need senior marketing expertise without hiring a full-time executive." },
];


const experienceItems = [
  { name: "FESPA", descriptor: "Profit for Purpose" },
  { name: "doTERRA Africa", descriptor: "Africa" },
  { name: "Amway", descriptor: "Global FMCG" },
  { name: "HRG Rennies Travel", descriptor: "Corporate Travel" },
  { name: "NYDA", descriptor: "National Youth Development Agency" },
  { name: "South African Express Airways", descriptor: "" },
  { name: "Avon Justine", descriptor: "Beauty & Direct Sales" },
  { name: "Avroy Shlain", descriptor: "True To You" },
];


const clientExperienceStatements = [
  { number: "01", title: "Clarity", summary: "A clearer path from challenge to action.", detail: "TLCG helps organisations make sense of complex marketing, communications and engagement challenges, turning insight into practical direction." },
  { number: "02", title: "Collaboration", summary: "A partner who works alongside your team.", detail: "We work collaboratively, becoming an extension of your team and bringing strategic thinking, practical expertise and trusted delivery together." },
  { number: "03", title: "Confidence", summary: "Confidence in the work and the way it gets delivered.", detail: "From strategy through execution, TLCG brings structure, experience and attention to detail so organisations can move forward with confidence." },
  { number: "04", title: "Connection", summary: "Work that connects people, messages and moments.", detail: "We connect strategy, communications, marketing and experiences so that every element works together and creates a stronger overall impact." },
  { number: "05", title: "Impact", summary: "Meaningful work designed to make a difference.", detail: "Every engagement is shaped around clear objectives, practical outcomes and work that creates lasting value for the organisation." },
];


const differenceItems = [
  { number: "01", title: "Connected Thinking", detail: "We bring strategy, communication and experience together around the outcome that matters." },
  { number: "02", title: "Corporate Fluency", detail: "We understand the audiences, stakeholders and practical demands that shape corporate work." },
  { number: "03", title: "2+ Decades of Experience", detail: "Practical experience across marketing, communications, events and meaningful corporate experiences." },
  { number: "04", title: "From Plan to Presence", detail: "We take an idea from early direction through detailed planning to confident execution." },
  { number: "05", title: "Flexible Engagement Models", detail: "Project-based consulting, retainer partnerships, fractional leadership and event support." },
  { number: "06", title: "Trusted Partnership", detail: "We become an extension of your team, delivering practical solutions that create lasting value." },
];


const expertiseGroups = [
  {
    title: "Strategy & Communications",
    icon: Presentation,
    items: ["Marketing Strategy", "Corporate Communications", "Stakeholder Engagement", "Executive Messaging", "Brand Positioning", "Social Media Management"],
  },
