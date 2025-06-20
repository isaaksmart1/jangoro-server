import { Star, X } from "lucide-react";
import { useState } from "react";

interface Example {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  textColor: string;
  difficultyColor: string;
  content: string;
}

const examples: Example[] = [
  {
    id: "example1",
    title: "Customer Satisfaction Survey",
    description: "Measure customer happiness and identify improvement areas with AI-powered sentiment analysis.",
    difficulty: "Beginner",
    gradientFrom: "from-blue-50",
    gradientTo: "to-blue-100",
    borderColor: "border-blue-200",
    textColor: "text-blue-900",
    difficultyColor: "text-blue-600",
    content: `
      <h4>Overview</h4>
      <p>Learn how to create and deploy a comprehensive customer satisfaction survey that leverages AI-powered sentiment analysis to provide actionable insights.</p>
      
      <h4>Step 1: Survey Design</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-4 mb-4">
        <p class="font-medium mb-2">Key Questions to Include:</p>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Overall satisfaction rating (1-10 scale)</li>
          <li>Product/service quality assessment</li>
          <li>Customer support experience</li>
          <li>Likelihood to recommend (NPS)</li>
          <li>Open-ended feedback section</li>
        </ul>
      </div>
      
      <h4>Step 2: Sample Survey Response Data</h4>
      <p>Here's what your customer satisfaction survey data would look like:</p>
      <div class="overflow-x-auto mb-4">
        <table class="min-w-full bg-white border border-slate-200 rounded-lg text-sm">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Customer ID</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Overall Rating</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Quality</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Support</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">NPS</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">CUST-001</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">8</span></td>
              <td class="px-4 py-2">9</td>
              <td class="px-4 py-2">7</td>
              <td class="px-4 py-2">8</td>
              <td class="px-4 py-2 text-slate-600">Great product, could improve support response time</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">CUST-002</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">9</span></td>
              <td class="px-4 py-2">8</td>
              <td class="px-4 py-2">9</td>
              <td class="px-4 py-2">9</td>
              <td class="px-4 py-2 text-slate-600">Excellent service, highly recommend to others!</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">CUST-003</td>
              <td class="px-4 py-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">6</span></td>
              <td class="px-4 py-2">7</td>
              <td class="px-4 py-2">5</td>
              <td class="px-4 py-2">6</td>
              <td class="px-4 py-2 text-slate-600">Product is okay but customer service needs improvement</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">CUST-004</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">10</span></td>
              <td class="px-4 py-2">10</td>
              <td class="px-4 py-2">10</td>
              <td class="px-4 py-2">10</td>
              <td class="px-4 py-2 text-slate-600">Outstanding experience! Will definitely use again</td>
            </tr>
            <tr>
              <td class="px-4 py-2">CUST-005</td>
              <td class="px-4 py-2"><span class="bg-red-100 text-red-800 px-2 py-1 rounded">4</span></td>
              <td class="px-4 py-2">5</td>
              <td class="px-4 py-2">3</td>
              <td class="px-4 py-2">2</td>
              <td class="px-4 py-2 text-slate-600">Disappointed with the service quality and long wait times</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4>Step 3: AI Analysis Results</h4>
      <p>Jangoro automatically analyzes your data and provides:</p>
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Sentiment Analysis</h5>
          <ul class="text-sm space-y-1">
            <li>• Positive: 60% (3 responses)</li>
            <li>• Neutral: 20% (1 response)</li>
            <li>• Negative: 20% (1 response)</li>
          </ul>
        </div>
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Key Themes</h5>
          <ul class="text-sm space-y-1">
            <li>• Support response time (mentioned 2x)</li>
            <li>• Service quality (mentioned 3x)</li>
            <li>• Product satisfaction (mentioned 4x)</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <p class="font-medium text-green-900 mb-2">Expected Outcome:</p>
        <p class="text-green-800 text-sm">Average satisfaction: 7.4/10, Priority improvement area: Customer support response times, Predicted 15% NPS increase with support improvements.</p>
      </div>
    `
  },
  {
    id: "example2",
    title: "Product Feedback Analysis",
    description: "Analyze product reviews and feedback to prioritize feature development and improvements.",
    difficulty: "Beginner",
    gradientFrom: "from-green-50",
    gradientTo: "to-green-100",
    borderColor: "border-green-200",
    textColor: "text-green-900",
    difficultyColor: "text-green-600",
    content: `
      <h4>Overview</h4>
      <p>Transform raw product feedback into actionable product development insights using advanced text analysis and feature prioritization.</p>
      
      <h4>Step 1: Product Review Data Collection</h4>
      <p>Sample product review data from various sources:</p>
      <div class="overflow-x-auto mb-4">
        <table class="min-w-full bg-white border border-slate-200 rounded-lg text-sm">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Review ID</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Source</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Rating</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Product</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Review Text</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">REV-001</td>
              <td class="px-4 py-2">App Store</td>
              <td class="px-4 py-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">4</span></td>
              <td class="px-4 py-2">Mobile App</td>
              <td class="px-4 py-2 text-slate-600">Love the new UI but crashes on iOS 15</td>
              <td class="px-4 py-2">2024-01-15</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">REV-002</td>
              <td class="px-4 py-2">Support Ticket</td>
              <td class="px-4 py-2"><span class="bg-red-100 text-red-800 px-2 py-1 rounded">2</span></td>
              <td class="px-4 py-2">Dashboard</td>
              <td class="px-4 py-2 text-slate-600">Cannot export data to CSV format - major limitation</td>
              <td class="px-4 py-2">2024-01-16</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">REV-003</td>
              <td class="px-4 py-2">User Interview</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">5</span></td>
              <td class="px-4 py-2">Dashboard</td>
              <td class="px-4 py-2 text-slate-600">Amazing dashboard features, very intuitive design</td>
              <td class="px-4 py-2">2024-01-17</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">REV-004</td>
              <td class="px-4 py-2">Beta Feedback</td>
              <td class="px-4 py-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">3</span></td>
              <td class="px-4 py-2">Mobile App</td>
              <td class="px-4 py-2 text-slate-600">App is slow on older devices, needs performance optimization</td>
              <td class="px-4 py-2">2024-01-18</td>
            </tr>
            <tr>
              <td class="px-4 py-2">REV-005</td>
              <td class="px-4 py-2">Social Media</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">5</span></td>
              <td class="px-4 py-2">Overall</td>
              <td class="px-4 py-2 text-slate-600">Excellent product! The analytics features are game-changing</td>
              <td class="px-4 py-2">2024-01-19</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4>Step 2: AI-Powered Feature Analysis</h4>
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Feature Priority Matrix</h5>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Export functionality</span>
              <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">High (45 mentions)</span>
            </div>
            <div class="flex justify-between">
              <span>iOS compatibility</span>
              <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Medium (32 mentions)</span>
            </div>
            <div class="flex justify-between">
              <span>Performance optimization</span>
              <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Medium (28 mentions)</span>
            </div>
          </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Sentiment Breakdown</h5>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Overall Rating</span>
              <span class="font-medium">3.8/5</span>
            </div>
            <div class="flex justify-between">
              <span>UI/UX Satisfaction</span>
              <span class="text-green-600 font-medium">89% positive</span>
            </div>
            <div class="flex justify-between">
              <span>Performance Issues</span>
              <span class="text-red-600 font-medium">45% negative</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p class="font-medium text-blue-900 mb-2">Recommended Actions:</p>
        <ul class="text-blue-800 text-sm list-disc list-inside space-y-1">
          <li>Prioritize CSV export feature development (highest impact)</li>
          <li>Address iOS 15 compatibility issues (affects 32% of mobile users)</li>
          <li>Optimize performance for older devices (improve retention)</li>
        </ul>
      </div>
    `
  },
  // Add more examples here following the same pattern
  {
    id: "example3",
    title: "Employee Engagement Study",
    description: "Track employee satisfaction, identify trends, and improve workplace culture with detailed analytics.",
    difficulty: "Intermediate",
    gradientFrom: "from-purple-50",
    gradientTo: "to-purple-100",
    borderColor: "border-purple-200",
    textColor: "text-purple-900",
    difficultyColor: "text-purple-600",
    content: `
      <h4>Overview</h4>
      <p>Conduct comprehensive employee engagement surveys to understand workplace satisfaction and identify areas for improvement.</p>
      
      <h4>Employee Engagement Survey Data</h4>
      <div class="overflow-x-auto mb-4">
        <table class="min-w-full bg-white border border-slate-200 rounded-lg text-sm">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Employee ID</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Department</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Engagement Score</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Job Satisfaction</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Work-Life Balance</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">EMP-101</td>
              <td class="px-4 py-2">Engineering</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">8.5</span></td>
              <td class="px-4 py-2">9</td>
              <td class="px-4 py-2">7</td>
              <td class="px-4 py-2 text-slate-600">Love the flexible work arrangements</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">EMP-102</td>
              <td class="px-4 py-2">Marketing</td>
              <td class="px-4 py-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">6.2</span></td>
              <td class="px-4 py-2">6</td>
              <td class="px-4 py-2">5</td>
              <td class="px-4 py-2 text-slate-600">Workload has been overwhelming lately</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">EMP-103</td>
              <td class="px-4 py-2">Sales</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">9.1</span></td>
              <td class="px-4 py-2">9</td>
              <td class="px-4 py-2">8</td>
              <td class="px-4 py-2 text-slate-600">Great team culture and management support</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">EMP-104</td>
              <td class="px-4 py-2">HR</td>
              <td class="px-4 py-2"><span class="bg-red-100 text-red-800 px-2 py-1 rounded">4.8</span></td>
              <td class="px-4 py-2">5</td>
              <td class="px-4 py-2">4</td>
              <td class="px-4 py-2 text-slate-600">Need better career development opportunities</td>
            </tr>
            <tr>
              <td class="px-4 py-2">EMP-105</td>
              <td class="px-4 py-2">Engineering</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">7.9</span></td>
              <td class="px-4 py-2">8</td>
              <td class="px-4 py-2">7</td>
              <td class="px-4 py-2 text-slate-600">Satisfied with current role and growth path</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4>Engagement Analytics Dashboard</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-4">
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Overall Metrics</h5>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Avg Engagement</span>
              <span class="font-medium">7.3/10</span>
            </div>
            <div class="flex justify-between">
              <span>Response Rate</span>
              <span class="text-green-600 font-medium">87%</span>
            </div>
          </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Department Ranking</h5>
          <div class="space-y-1 text-sm">
            <div>1. Sales (9.1)</div>
            <div>2. Engineering (8.2)</div>
            <div>3. Marketing (6.2)</div>
            <div>4. HR (4.8)</div>
          </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Key Issues</h5>
          <div class="space-y-1 text-sm">
            <div>• Workload management</div>
            <div>• Career development</div>
            <div>• Work-life balance</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "example4",
    title: "Market Research Campaign",
    description: "Conduct comprehensive market research with advanced segmentation and demographic analysis.",
    difficulty: "Intermediate",
    gradientFrom: "from-orange-50",
    gradientTo: "to-orange-100",
    borderColor: "border-orange-200",
    textColor: "text-orange-900",
    difficultyColor: "text-orange-600",
    content: `
      <h4>Overview</h4>
      <p>Execute comprehensive market research with demographic targeting and competitive analysis for strategic decision making.</p>
      
      <h4>Market Research Survey Results</h4>
      <div class="overflow-x-auto mb-4">
        <table class="min-w-full bg-white border border-slate-200 rounded-lg text-sm">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Participant ID</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Age Group</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Region</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Brand Preference</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Purchase Intent</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Price Sensitivity</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">MR-001</td>
              <td class="px-4 py-2">25-34</td>
              <td class="px-4 py-2">Northeast</td>
              <td class="px-4 py-2">Brand A</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">High</span></td>
              <td class="px-4 py-2">Low</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">MR-002</td>
              <td class="px-4 py-2">35-44</td>
              <td class="px-4 py-2">Southeast</td>
              <td class="px-4 py-2">Brand B</td>
              <td class="px-4 py-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Medium</span></td>
              <td class="px-4 py-2">High</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">MR-003</td>
              <td class="px-4 py-2">18-24</td>
              <td class="px-4 py-2">West Coast</td>
              <td class="px-4 py-2">Brand A</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">High</span></td>
              <td class="px-4 py-2">Medium</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">MR-004</td>
              <td class="px-4 py-2">45-54</td>
              <td class="px-4 py-2">Midwest</td>
              <td class="px-4 py-2">Brand C</td>
              <td class="px-4 py-2"><span class="bg-red-100 text-red-800 px-2 py-1 rounded">Low</span></td>
              <td class="px-4 py-2">High</td>
            </tr>
            <tr>
              <td class="px-4 py-2">MR-005</td>
              <td class="px-4 py-2">25-34</td>
              <td class="px-4 py-2">Southwest</td>
              <td class="px-4 py-2">Brand A</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">High</span></td>
              <td class="px-4 py-2">Low</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4>Market Segmentation Analysis</h4>
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Demographic Insights</h5>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>25-34 age group</span>
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">45% market share</span>
            </div>
            <div class="flex justify-between">
              <span>Northeast region</span>
              <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Highest intent</span>
            </div>
            <div class="flex justify-between">
              <span>Price sensitivity</span>
              <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Medium-High</span>
            </div>
          </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Competitive Analysis</h5>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Brand A preference</span>
              <span class="text-green-600 font-medium">60%</span>
            </div>
            <div class="flex justify-between">
              <span>Brand B preference</span>
              <span class="text-yellow-600 font-medium">20%</span>
            </div>
            <div class="flex justify-between">
              <span>Brand C preference</span>
              <span class="text-red-600 font-medium">20%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p class="font-medium text-orange-900 mb-2">Strategic Recommendations:</p>
        <ul class="text-orange-800 text-sm list-disc list-inside space-y-1">
          <li>Target 25-34 demographic for highest conversion potential</li>
          <li>Focus marketing efforts in Northeast and West Coast regions</li>
          <li>Develop value-oriented messaging for price-sensitive segments</li>
          <li>Leverage Brand A's strong market position for expansion</li>
        </ul>
      </div>
    `
  },
  {
    id: "example5",
    title: "Event Feedback Collection",
    description: "Gather and analyze event feedback in real-time with live polling and instant insights generation.",
    difficulty: "Beginner",
    gradientFrom: "from-red-50",
    gradientTo: "to-red-100",
    borderColor: "border-red-200",
    textColor: "text-red-900",
    difficultyColor: "text-red-600",
    content: `
      <h4>Overview</h4>
      <p>Collect real-time feedback during events and generate instant insights for immediate action.</p>
      
      <h4>Live Event Feedback Data</h4>
      <div class="overflow-x-auto mb-4">
        <table class="min-w-full bg-white border border-slate-200 rounded-lg text-sm">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Timestamp</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Session</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Rating</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Engagement</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Feedback</th>
              <th class="px-4 py-2 text-left font-medium text-slate-900 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">10:15 AM</td>
              <td class="px-4 py-2">Keynote</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">9</span></td>
              <td class="px-4 py-2">High</td>
              <td class="px-4 py-2 text-slate-600">Excellent speaker, very engaging content</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Live</span></td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">11:30 AM</td>
              <td class="px-4 py-2">Tech Demo</td>
              <td class="px-4 py-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">7</span></td>
              <td class="px-4 py-2">Medium</td>
              <td class="px-4 py-2 text-slate-600">Good demo but audio quality could be better</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Live</span></td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">2:45 PM</td>
              <td class="px-4 py-2">Panel Discussion</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">8</span></td>
              <td class="px-4 py-2">High</td>
              <td class="px-4 py-2 text-slate-600">Great insights from industry experts</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Live</span></td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">4:20 PM</td>
              <td class="px-4 py-2">Networking</td>
              <td class="px-4 py-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">6</span></td>
              <td class="px-4 py-2">Low</td>
              <td class="px-4 py-2 text-slate-600">Space is too crowded, hard to network</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Live</span></td>
            </tr>
            <tr>
              <td class="px-4 py-2">5:10 PM</td>
              <td class="px-4 py-2">Closing</td>
              <td class="px-4 py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">8</span></td>
              <td class="px-4 py-2">High</td>
              <td class="px-4 py-2 text-slate-600">Great event overall, would attend again</td>
              <td class="px-4 py-2"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Complete</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4>Real-time Analytics Dashboard</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-4">
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Live Metrics</h5>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Avg Rating</span>
              <span class="font-medium">7.6/10</span>
            </div>
            <div class="flex justify-between">
              <span>Active Responses</span>
              <span class="text-green-600 font-medium">142</span>
            </div>
            <div class="flex justify-between">
              <span>Response Rate</span>
              <span class="text-blue-600 font-medium">73%</span>
            </div>
          </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Session Performance</h5>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span>Keynote</span>
              <span class="text-green-600">9.0</span>
            </div>
            <div class="flex justify-between">
              <span>Panel Discussion</span>
              <span class="text-green-600">8.0</span>
            </div>
            <div class="flex justify-between">
              <span>Tech Demo</span>
              <span class="text-yellow-600">7.0</span>
            </div>
            <div class="flex justify-between">
              <span>Networking</span>
              <span class="text-red-600">6.0</span>
            </div>
          </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-lg p-4">
          <h5 class="font-medium mb-2">Immediate Actions</h5>
          <div class="space-y-1 text-sm">
            <div class="bg-yellow-50 p-2 rounded border-l-2 border-yellow-400">
              <span class="text-yellow-800">Audio issues reported</span>
            </div>
            <div class="bg-red-50 p-2 rounded border-l-2 border-red-400">
              <span class="text-red-800">Overcrowding in networking area</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "example6",
    title: "Brand Perception Analysis",
    description: "Monitor brand sentiment across multiple channels and track reputation changes over time.",
    difficulty: "Advanced",
    gradientFrom: "from-teal-50",
    gradientTo: "to-teal-100",
    borderColor: "border-teal-200",
    textColor: "text-teal-900",
    difficultyColor: "text-teal-600",
    content: `
      <h4>Overview</h4>
      <p>Track brand sentiment across multiple channels and monitor reputation changes over time.</p>
      
      <h4>Multi-channel Analysis</h4>
      <p>Comprehensive brand monitoring across social media, reviews, and customer feedback channels.</p>
    `
  },
  {
    id: "example7",
    title: "Academic Research Study",
    description: "Design and execute academic surveys with statistical analysis and research methodology support.",
    difficulty: "Advanced",
    gradientFrom: "from-indigo-50",
    gradientTo: "to-indigo-100",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-900",
    difficultyColor: "text-indigo-600",
    content: `
      <h4>Overview</h4>
      <p>Conduct rigorous academic research with proper statistical methodology and analysis tools.</p>
      
      <h4>Research Methods</h4>
      <p>Statistical significance testing, sample size calculations, and research methodology validation.</p>
    `
  },
  {
    id: "example8",
    title: "User Experience Testing",
    description: "Test user interfaces and experiences with behavioral tracking and usability scoring.",
    difficulty: "Intermediate",
    gradientFrom: "from-pink-50",
    gradientTo: "to-pink-100",
    borderColor: "border-pink-200",
    textColor: "text-pink-900",
    difficultyColor: "text-pink-600",
    content: `
      <h4>Overview</h4>
      <p>Evaluate user experience through behavioral tracking and usability metrics.</p>
      
      <h4>UX Metrics</h4>
      <p>Task completion rates, user satisfaction scores, and behavioral pattern analysis.</p>
    `
  },
  {
    id: "example9",
    title: "Training Effectiveness Survey",
    description: "Measure training program effectiveness and identify knowledge gaps with pre/post assessments.",
    difficulty: "Intermediate",
    gradientFrom: "from-yellow-50",
    gradientTo: "to-yellow-100",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-900",
    difficultyColor: "text-yellow-600",
    content: `
      <h4>Overview</h4>
      <p>Assess training program effectiveness through pre and post training evaluations.</p>
      
      <h4>Assessment Methods</h4>
      <p>Knowledge retention tracking, skill improvement measurement, and ROI calculation for training programs.</p>
    `
  },
  {
    id: "example10",
    title: "Multi-Language Global Survey",
    description: "Deploy surveys across multiple regions with automatic translation and cultural adaptation.",
    difficulty: "Advanced",
    gradientFrom: "from-gray-50",
    gradientTo: "to-gray-100",
    borderColor: "border-gray-200",
    textColor: "text-gray-900",
    difficultyColor: "text-gray-600",
    content: `
      <h4>Overview</h4>
      <p>Execute global surveys with automatic translation and cultural adaptation features.</p>
      
      <h4>Global Features</h4>
      <p>Multi-language support, cultural bias detection, and regional compliance management.</p>
    `
  }
];

export default function ExamplesSection() {
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);

  const getDifficultyStars = (difficulty: string) => {
    const stars = difficulty === "Beginner" ? 1 : difficulty === "Intermediate" ? 2 : 3;
    return Array.from({ length: stars }, (_, i) => (
      <Star key={i} className="w-4 h-4 mr-1" />
    ));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8">
      <div className="max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">10 Practical Examples</h1>
        <p className="text-lg text-slate-600 mb-8">Real-world use cases and step-by-step implementations to help you get the most out of Jangoro.</p>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {examples.map((example, index) => (
            <div
              key={example.id}
              className={`bg-gradient-to-br ${example.gradientFrom} ${example.gradientTo} border ${example.borderColor} rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer`}
              onClick={() => setSelectedExample(example)}
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 bg-${example.difficultyColor.split('-')[1]}-500 text-white rounded-lg flex items-center justify-center font-bold mr-4`}>
                  {index + 1}
                </div>
                <h2 className={`text-xl font-bold ${example.textColor}`}>{example.title}</h2>
              </div>
              <p className={`${example.textColor.replace('900', '800')} mb-4`}>{example.description}</p>
              <div className={`flex items-center ${example.difficultyColor} text-sm font-medium`}>
                {getDifficultyStars(example.difficulty)}
                Difficulty: {example.difficulty}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Example */}
        {selectedExample ? <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-slate-900">{selectedExample.title}</h3>
              <button 
                onClick={() => setSelectedExample(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedExample.content }}
            />
          </div> : null}
      </div>
    </div>
  );
}
