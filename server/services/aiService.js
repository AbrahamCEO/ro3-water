const { HfInference } = require("@huggingface/inference");

// RO3 Water company data
const companyData = {
  stores: [
    {
      name: 'RO3 Water Windhoek Central',
      address: '123 Independence Ave, Windhoek',
      phone: '+264 61 123 4567',
      hours: '8:00 AM - 6:00 PM',
      region: 'Central'
    },
    {
      name: 'RO3 Water Klein Windhoek',
      address: '456 Nelson Mandela Ave, Klein Windhoek',
      phone: '+264 61 234 5678',
      hours: '8:00 AM - 7:00 PM',
      region: 'East'
    },
    {
      name: 'RO3 Water Swakopmund',
      address: '789 Sam Nujoma Dr, Swakopmund',
      phone: '+264 64 345 6789',
      hours: '9:00 AM - 6:00 PM',
      region: 'Coastal'
    },
    {
      name: 'RO3 Water Walvis Bay',
      address: '321 Beach Road, Walvis Bay',
      phone: '+264 64 456 7890',
      hours: '8:30 AM - 6:30 PM',
      region: 'Coastal'
    },
    {
      name: 'RO3 Water Oshakati',
      address: '654 Main Street, Oshakati',
      phone: '+264 65 567 8901',
      hours: '8:00 AM - 5:30 PM',
      region: 'North'
    }
  ],
  products: [
    {
      name: 'Still Water',
      description: 'Premium quality water, carefully processed to ensure the highest standards of hydration.'
    },
    {
      name: 'Sparkling Water',
      description: 'Premium sparkling water, crafted to quench your thirst and delight your senses.'
    },
    {
      name: 'Ice Cubes',
      description: 'Premium ice cubes, made from the purest water and designed to keep your drinks cool and refreshing.'
    },
    {
      name: 'Refill Water',
      description: 'Premium refill water, carefully crafted to provide the best hydration experience.'
    },
    {
      name: 'Water Dispensers',
      description: 'Premium water dispensers, designed to provide fresh and clean drinking water at all times.'
    }
  ],
  companyInfo: {
    vision: "To revolutionize access to clean water across Southern Africa, making pure, refreshing water available to everyone.",
    mission: "To be Africa's leading brand for purified water.",
    philosophy: "We believe that everyone deserves access to clean, safe drinking water. Our philosophy centers on sustainability, innovation, and community empowerment.",
    website: "https://ro3water.co.na"
  }
};

class AIService {
  constructor() {
    this.client = new HfInference(process.env.HF_API_KEY);
    this.model = "Qwen/Qwen2.5-Coder-32B-Instruct";
  }

  generateResponse(userMessage) {
    // Helper function to find store information
    const findStoreInfo = (query) => {
      const normalizedQuery = query.toLowerCase();
      return companyData.stores.filter(store => 
        store.name.toLowerCase().includes(normalizedQuery) ||
        store.region.toLowerCase().includes(normalizedQuery) ||
        store.address.toLowerCase().includes(normalizedQuery)
      );
    };

    // Helper function to find product information
    const findProductInfo = (query) => {
      const normalizedQuery = query.toLowerCase();
      return companyData.products.filter(product =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      );
    };

    // Process the message and generate appropriate response
    const message = userMessage.toLowerCase();
    
    // Location/Store related queries
    if (message.includes('location') || message.includes('store') || message.includes('branch')) {
      const stores = findStoreInfo(message);
      if (stores.length > 0) {
        return stores.map(store => 
          `${store.name}\nAddress: ${store.address}\nPhone: ${store.phone}\nHours: ${store.hours}`
        ).join('\n\n');
      }
      return "We have stores in Windhoek Central, Klein Windhoek, Swakopmund, Walvis Bay, and Oshakati. Which location would you like to know more about?";
    }

    // Product related queries
    if (message.includes('product') || message.includes('water') || message.includes('ice') || message.includes('dispenser')) {
      const products = findProductInfo(message);
      if (products.length > 0) {
        return products.map(product =>
          `${product.name}: ${product.description}`
        ).join('\n\n');
      }
      return "We offer Still Water, Sparkling Water, Ice Cubes, Refill Water, and Water Dispensers. Which product would you like to know more about?";
    }

    // Company information queries
    if (message.includes('about') || message.includes('company') || message.includes('vision') || message.includes('mission')) {
      return `RO3 Water is a leading water provider in Southern Africa.\n\nVision: ${companyData.companyInfo.vision}\n\nMission: ${companyData.companyInfo.mission}\n\nPhilosophy: ${companyData.companyInfo.philosophy}`;
    }

    // Hours of operation queries
    if (message.includes('hour') || message.includes('open') || message.includes('close')) {
      return "Our stores generally operate from 8:00 AM to 6:00 PM, with some variations by location. Would you like to know the specific hours for a particular store?";
    }

    // Contact information queries
    if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
      return "You can contact our stores directly:\n\n" + companyData.stores.map(store =>
        `${store.name}: ${store.phone}`
      ).join('\n');
    }

    // Default response
    return "I'm here to help you with information about RO3 Water's products, store locations, hours of operation, and more. What would you like to know?";
  }

  async processMessage(message) {
    try {
      const response = this.generateResponse(message);
      
      return {
        type: 'bot',
        content: response
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please try again or contact our customer service for assistance.'
      };
    }
  }
}

module.exports = new AIService();
