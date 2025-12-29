'use client';

import { useState } from 'react';

interface FamilyMember {
  id: number;
  name: string;
  phone: string;
}

export default function WhatsAppChristmasWishes() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: 1, name: '', phone: '' },
    { id: 2, name: '', phone: '' },
    { id: 3, name: '', phone: '' },
    { id: 4, name: '', phone: '' },
    { id: 5, name: '', phone: '' },
    { id: 6, name: '', phone: '' },
  ]);
  const [scheduledDate, setScheduledDate] = useState('2024-12-25');
  const [isScheduled, setIsScheduled] = useState(false);

  const updateMember = (id: number, field: 'name' | 'phone', value: string) => {
    setFamilyMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const generatePersonalizedMessage = (name: string): string => {
    const messages = [
      `Merry Christmas ${name}! 🎄✨ May your holiday season be filled with warmth, joy, and precious moments with loved ones. Wishing you a wonderful year ahead!`,
      `Dear ${name}, wishing you a magical Christmas! 🎅🎁 May this festive season bring you happiness, peace, and all the blessings you deserve. Love always!`,
      `Happy Christmas ${name}! ⭐🎄 May the spirit of Christmas fill your heart with love and your home with laughter. Here's to beautiful memories and a bright new year!`,
      `${name}, sending you warm Christmas wishes! 🎁❤️ May this special day bring you closer to those you love and fill your life with endless joy and prosperity!`,
      `Merry Christmas to you, ${name}! 🌟🎄 Wishing you peace, love, and happiness this holiday season. May all your dreams come true in the coming year!`,
      `Dear ${name}, may your Christmas sparkle with moments of love and laughter! ✨🎅 Wishing you and your loved ones a blessed and joyful holiday season!`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleSchedule = () => {
    const filledMembers = familyMembers.filter(m => m.name && m.phone);
    if (filledMembers.length === 0) {
      alert('Please add at least one family member with name and phone number!');
      return;
    }
    setIsScheduled(true);
  };

  const sendMessage = (member: FamilyMember) => {
    const message = generatePersonalizedMessage(member.name);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${member.phone.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-red-600 mb-4">
            🎄 Christmas Wishes Sender
          </h1>
          <p className="text-gray-700 text-lg">
            Send personalized WhatsApp Christmas wishes to your family
          </p>
        </div>

        {!isScheduled ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Family Members Form */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Add Your Family Members
            </h2>
            <div className="space-y-4 mb-8">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex gap-4 items-center">
                  <span className="text-2xl">👤</span>
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-gray-800"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (with country code)"
                    value={member.phone}
                    onChange={(e) => updateMember(member.id, 'phone', e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-gray-800"
                  />
                </div>
              ))}
            </div>

            {/* Schedule Date */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Schedule Date
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-2xl">📅</span>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-gray-800"
                />
              </div>
            </div>

            {/* Schedule Button */}
            <button
              onClick={handleSchedule}
              className="w-full bg-gradient-to-r from-red-500 to-green-500 text-white font-bold py-4 px-8 rounded-lg text-xl hover:from-red-600 hover:to-green-600 transition-all transform hover:scale-105 shadow-lg"
            >
              🎅 Schedule Christmas Wishes
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">
                Wishes Scheduled!
              </h2>
              <p className="text-gray-600 text-lg">
                Your personalized Christmas wishes are ready to be sent on {scheduledDate}
              </p>
            </div>

            {/* Preview Messages */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Preview Your Messages:
              </h3>
              {familyMembers
                .filter(m => m.name && m.phone)
                .map((member) => (
                  <div key={member.id} className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.phone}</p>
                      </div>
                      <button
                        onClick={() => sendMessage(member)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                      >
                        Send Now 📱
                      </button>
                    </div>
                    <p className="text-gray-700 text-sm mt-2">
                      {generatePersonalizedMessage(member.name)}
                    </p>
                  </div>
                ))}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsScheduled(false)}
              className="w-full bg-gray-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-600 transition-all"
            >
              ← Edit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

