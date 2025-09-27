import React, { useState } from 'react';
import { X, Mail, Phone, MessageCircle, FileText } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@snacklery.com?subject=Product Enquiry&body=Hi, I am interested in your edible cutlery products. Please provide more details.';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918985985974?text=Hi, I am interested in your edible cutlery products. Please provide more details.', '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+918985985974';
  };

  const handleContactFormClick = () => {
    onClose();
    // Navigate to contact page
    window.location.href = '/contact';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
          <p className="text-gray-600 mt-2">Choose your preferred way to contact us</p>
        </div>

        {/* Contact options */}
        <div className="p-6 space-y-4">
          {/* Email */}
          <button
            onClick={handleEmailClick}
            className="w-full flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
          >
            <div className="bg-blue-500 p-2 rounded-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email Us</h3>
              <p className="text-sm text-gray-600">hello@snacklery.com</p>
            </div>
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
          >
            <div className="bg-green-500 p-2 rounded-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">WhatsApp</h3>
              <p className="text-sm text-gray-600">+91 89859 85974</p>
            </div>
          </button>

          {/* Phone */}
          <button
            onClick={handlePhoneClick}
            className="w-full flex items-center gap-4 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left"
          >
            <div className="bg-orange-500 p-2 rounded-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Call Us</h3>
              <p className="text-sm text-gray-600">+91 89859 85974</p>
            </div>
          </button>

          {/* Contact Form */}
          <button
            onClick={handleContactFormClick}
            className="w-full flex items-center gap-4 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
          >
            <div className="bg-purple-500 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Contact Form</h3>
              <p className="text-sm text-gray-600">Fill out our detailed form</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600 text-center">
            We typically respond within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;