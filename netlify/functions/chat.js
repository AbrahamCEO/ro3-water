const { HfInference } = require("@huggingface/inference");

// Import company data
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
    }
  ]
};

class AIService {
  constructor() {
    this.client = new HfInference(process.env.HF_API_KEY);
    this.model = "Qwen/Qwen2.5-Coder-32B-Instruct";
  }

  findStoreInfo(query) {
    const normalizedQuery = query.toLowerCase();
    return companyData.stores.find(store => 
      store.name.toLowerCase().includes(normalizedQuery) ||
      store.region.toLowerCase().includes(normalizedQuery) ||
      store.address.toLowerCase().includes(normalizedQuery)
    );
  }

  findProductInfo(query) {
    const normalizedQuery = query.toLowerCase();
    return companyData.products.find(product =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
  }

  async processMessage(message) {
    try {
      // Check for store-related queries
      if (message.toLowerCase().includes('store') || message.toLowerCase().includes('location')) {
        const storeInfo = this.findStoreInfo(message);
        if (storeInfo) {
          return {
            type: 'bot',
            content: `Here's the information about ${storeInfo.name}:\nAddress: ${storeInfo.address}\nPhone: ${storeInfo.phone}\nHours: ${storeInfo.hours}`
          };
        }
      }

      // Check for product-related queries
      if (message.toLowerCase().includes('water') || message.toLowerCase().includes('product')) {
        const productInfo = this.findProductInfo(message);
        if (productInfo) {
          return {
            type: 'bot',
            content: `${productInfo.name}: ${productInfo.description}`
          };
        }
      }

      // Generate response using AI model
      const response = await this.client.textGeneration({
        model: this.model,
        inputs: message,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.15
        }
      });

      return {
        type: 'bot',
        content: response.generated_text.trim()
      };

    } catch (error) {
      console.error('Error processing message:', error);
      return {
        type: 'bot',
        content: 'I apologize, but I encountered an error processing your request. Please try again.'
      };
    }
  }
}

const aiService = new AIService();

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);
    const response = await aiService.processMessage(message);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Internal server error',
        error: error.message 
      })
    };
  }
};
