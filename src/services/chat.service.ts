import { Conversation, Message, Source } from '@/types/chat';
import { simulateAxiosResponse } from './api';
import { AxiosResponse } from 'axios';


// 15 Mock Conversations
let mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    title: 'Employee onboarding & benefits',
    lastUpdated: '2026-07-04T10:00:00Z',
    messages: [
      {
        id: 'msg_1_1',
        role: 'user',
        content: 'Hi, can you explain the health insurance plans available for new employees?',
        timestamp: '2026-07-04T09:58:00Z',
      },
      {
        id: 'msg_1_2',
        role: 'assistant',
        content: `Welcome to the company! We offer two primary health insurance plans under our benefits program:

### 1. Standard PPO Plan
* **Provider:** Blue Cross Blue Shield
* **Coverage:** 90% in-network, 70% out-of-network
* **Best for:** Individuals wanting a broad choice of doctors without referrals.

### 2. High Deductible Health Plan (HDHP) with HSA
* **Provider:** Aetna
* **Coverage:** 80% after deductible is met.
* **HSA Contribution:** The company matches up to **$1,000** annually.
* **Best for:** Low-maintenance medical needs and saving pre-tax dollars.

| Plan Feature | PPO Plan | HDHP + HSA |
| :--- | :--- | :--- |
| **Deductible (Single)** | $500 | $1,500 |
| **Out-of-Pocket Max** | $3,000 | $4,500 |
| **Co-insurance** | 10% | 20% |
| **Monthly Premium** | $120 | $50 |

For enrollment, please visit the **Workday Portal** within 30 days of your start date.`,
        timestamp: '2026-07-04T10:00:00Z',
        sources: [
          { documentId: 'doc_3', filename: 'HR Policy.pdf', page: 7, confidence: 0.96 },
          { documentId: 'doc_1', filename: 'Employee Handbook.pdf', page: 12, confidence: 0.91 },
        ],
      },
    ],
  },
  {
    id: 'conv_2',
    title: 'API integration questions',
    lastUpdated: '2026-07-03T16:45:00Z',
    messages: [
      {
        id: 'msg_2_1',
        role: 'user',
        content: 'What are the rules for auth headers on internal microservices?',
        timestamp: '2026-07-03T16:43:00Z',
      },
      {
        id: 'msg_2_2',
        role: 'assistant',
        content: `All internal communication must be authenticated using standardized JWT bearer tokens in the authorization header.

Here is the format expected by the API gateway:

\`\`\`http
Authorization: Bearer <JWT_TOKEN>
X-Correlation-ID: <UUID>
\`\`\`

Here is a middleware example in Node.js for verifying headers:

\`\`\`javascript
const verifyInternalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }
  
  const token = authHeader.split(' ')[1];
  // Internal verification logic...
  next();
};
\`\`\`

Please ensure that correlation IDs are logged in all outgoing microservice calls.`,
        timestamp: '2026-07-03T16:45:00Z',
        sources: [
          { documentId: 'doc_2', filename: 'Engineering Guidelines.pdf', page: 4, confidence: 0.95 },
        ],
      },
    ],
  },
  {
    id: 'conv_3',
    title: 'Security compliance requirements',
    lastUpdated: '2026-07-02T14:20:00Z',
    messages: [
      {
        id: 'msg_3_1',
        role: 'user',
        content: 'How often do we rotate database passwords?',
        timestamp: '2026-07-02T14:18:00Z',
      },
      {
        id: 'msg_3_2',
        role: 'assistant',
        content: `According to our security compliance standards:
- **Production databases:** Secrets must be rotated automatically every **90 days** using AWS Secrets Manager.
- **Development/Staging databases:** Rollover is required every **180 days**.
- **Emergency rotations:** Triggered automatically if an anomaly or leak is flagged by GuardDuty.`,
        timestamp: '2026-07-02T14:20:00Z',
        sources: [
          { documentId: 'doc_4', filename: 'Security Compliance.pdf', page: 22, confidence: 0.98 },
        ],
      },
    ],
  },
  {
    id: 'conv_4',
    title: 'Vacation policy & PTO',
    lastUpdated: '2026-07-01T11:05:00Z',
    messages: [
      {
        id: 'msg_4_1',
        role: 'user',
        content: 'What is our annual PTO policy?',
        timestamp: '2026-07-01T11:03:00Z',
      },
      {
        id: 'msg_4_2',
        role: 'assistant',
        content: `We offer an **Unlimited PTO** policy based on mutual trust.
- We recommend taking a minimum of **20 days** per calendar year to refresh.
- Any vacation longer than **10 consecutive business days** requires manager approval at least 3 weeks in advance.
- Track your time off in Workday for reporting.`,
        timestamp: '2026-07-01T11:05:00Z',
        sources: [
          { documentId: 'doc_3', filename: 'HR Policy.pdf', page: 2, confidence: 0.93 },
        ],
      },
    ],
  },
  {
    id: 'conv_5',
    title: 'Code review guidelines',
    lastUpdated: '2026-06-30T09:30:00Z',
    messages: [
      {
        id: 'msg_5_1',
        role: 'user',
        content: 'How many approvals are needed to merge a PR?',
        timestamp: '2026-06-30T09:28:00Z',
      },
      {
        id: 'msg_5_2',
        role: 'assistant',
        content: `Our standards dictate:
- **At least 2 approvals** from core team developers are required.
- Standard checks (linting, tests, SonarQube quality gate) must pass.
- A designated **CODEOWNER** approval is required if editing security or core DB migrations.`,
        timestamp: '2026-06-30T09:30:00Z',
        sources: [
          { documentId: 'doc_2', filename: 'Engineering Guidelines.pdf', page: 1, confidence: 0.97 },
        ],
      },
    ],
  },
  // Add 10 additional stub conversations to hit the 15 count requirement
  ...Array.from({ length: 10 }, (_, i) => {
    const idNum = i + 6;
    const titles = [
      'Deployment strategy details',
      'Performance review cycle rules',
      'Remote work setup stipend',
      'Expense reimbursement guidelines',
      'Maternity & Paternity leaves',
      'Tech stack standards',
      'SLA definition standards',
      'On-call rotation schedule details',
      'Diversity & Inclusion guidelines',
      'Intellectual property policy rules',
    ];
    return {
      id: `conv_${idNum}`,
      title: titles[i],
      lastUpdated: new Date(Date.now() - (idNum * 24 * 60 * 60 * 1000)).toISOString(),
      messages: [
        {
          id: `msg_${idNum}_1`,
          role: 'user' as const,
          content: `Tell me about ${titles[i].toLowerCase()}`,
          timestamp: new Date(Date.now() - (idNum * 24 * 60 * 60 * 1000) - 2 * 60 * 1000).toISOString(),
        },
        {
          id: `msg_${idNum}_2`,
          role: 'assistant' as const,
          content: `Here are details regarding ${titles[i].toLowerCase()}. This is retrieved dynamically using standard company guides and processes. Feel free to ask specific follow-ups!`,
          timestamp: new Date(Date.now() - (idNum * 24 * 60 * 60 * 1000)).toISOString(),
          sources: [
            {
              documentId: `doc_${(idNum % 4) + 1}`,
              filename: ['Employee Handbook.pdf', 'Engineering Guidelines.pdf', 'HR Policy.pdf', 'Security Compliance.pdf'][idNum % 4],
              page: Math.floor(Math.random() * 20) + 1,
              confidence: 0.85 + (idNum % 15) / 100,
            },
          ],
        },
      ],
    };
  }),
];

// Simulated AI responses based on keywords
const AI_RESPONSE_TEMPLATES = [
  {
    keywords: ['holiday', 'vacation', 'leave', 'pto'],
    response: `### Leave and PTO Categories

Our leaves policy covers several circumstances:
1. **Annual Leave:** Unlimited PTO, recommended 20 days.
2. **Sick Leave:** Up to 10 fully paid days per calendar year.
3. **Maternal/Paternal:** 16 weeks of fully paid leave for primary caregivers.

Refer to the HR policy directory for local tax forms and guidelines.`,
    sources: [{ documentId: 'doc_3', filename: 'HR Policy.pdf', page: 4, confidence: 0.94 }],
  },
  {
    keywords: ['security', 'password', 'key', 'leak', 'rotate'],
    response: `### Cryptographic Key and Secret Standards

1. All secrets must be encrypted at rest using **KMS Customer Managed Keys (CMKs)**.
2. No API keys or plain passwords may be committed to repositories.
3. Use environment variables injected at runtime via Kubernetes Secrets or SSM Parameter Store.
4. Auto-rotation rules apply:
   * Database passwords: 90 days
   * AWS IAM user access keys: 90 days`,
    sources: [{ documentId: 'doc_4', filename: 'Security Compliance.pdf', page: 8, confidence: 0.97 }],
  },
  {
    keywords: ['react', 'next', 'typescript', 'eslint', 'prettier', 'code'],
    response: `### Frontend Coding Guidelines

We enforce clean frontend development rules:
* Always use **TypeScript** in strict mode (no \`any\`).
* Styling: Prefer Material UI widgets with styling tokens rather than styling ad-hoc.
* Code patterns: Use functional components, custom hooks for fetching, and avoid large context blocks that trigger unnecessary re-renders.

\`\`\`typescript
// Good custom hook example
export function useUserData(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });
}
\`\`\`

Format your code with Prettier before submitting pull requests.`,
    sources: [{ documentId: 'doc_2', filename: 'Engineering Guidelines.pdf', page: 9, confidence: 0.95 }],
  },
];

export const ChatService = {
  // Fetch all conversations
  getConversations(): Promise<AxiosResponse<Conversation[]>> {
    return simulateAxiosResponse(mockConversations);
  },

  // Fetch a single conversation
  getConversationById(id: string): Promise<AxiosResponse<Conversation>> {
    const conversation = mockConversations.find((c) => c.id === id);
    if (!conversation) {
      throw new Error(`Conversation with ID ${id} not found.`);
    }
    return simulateAxiosResponse(conversation);
  },

  // Create a new conversation
  createConversation(title = 'New Chat'): Promise<AxiosResponse<Conversation>> {
    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      title,
      lastUpdated: new Date().toISOString(),
      messages: [],
    };
    mockConversations = [newConv, ...mockConversations];
    return simulateAxiosResponse(newConv, 300);
  },

  // Delete a conversation
  deleteConversation(id: string): Promise<AxiosResponse<{ success: boolean }>> {
    mockConversations = mockConversations.filter((c) => c.id !== id);
    return simulateAxiosResponse({ success: true }, 300);
  },

  // Send a message and generate a response
  sendMessage(
    conversationId: string,
    messageText: string
  ): Promise<AxiosResponse<{ userMessage: Message; assistantMessage: Message }>> {
    const convIndex = mockConversations.findIndex((c) => c.id === conversationId);
    if (convIndex === -1) {
      throw new Error(`Conversation not found.`);
    }

    const timestamp = new Date().toISOString();
    const userMessage: Message = {
      id: `msg_u_${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp,
    };

    // Match keywords for custom response, else give generic RAG response
    const lowercaseInput = messageText.toLowerCase();
    const matched = AI_RESPONSE_TEMPLATES.find((t) =>
      t.keywords.some((k) => lowercaseInput.includes(k))
    );

    let aiContent = '';
    let aiSources: Source[] = [];

    if (matched) {
      aiContent = matched.response;
      aiSources = matched.sources;
    } else {
      aiContent = `### AI Retrieval Synthesis

I found some matching information regarding your query: "${messageText}".
* We have guidelines in place supporting this process.
* Please ensure you follow team approvals and safety policies.

Would you like me to find specific files or detail steps for this query?`;
      aiSources = [
        {
          documentId: 'doc_1',
          filename: 'Employee Handbook.pdf',
          page: Math.floor(Math.random() * 15) + 1,
          confidence: 0.93,
        },
      ];
    }

    const assistantMessage: Message = {
      id: `msg_a_${Date.now() + 1}`,
      role: 'assistant',
      content: aiContent,
      timestamp: new Date().toISOString(),
      sources: aiSources,
    };

    // Update internal mock conversations
    mockConversations[convIndex].messages.push(userMessage, assistantMessage);
    mockConversations[convIndex].lastUpdated = timestamp;

    // Move updated conversation to the top
    const updatedConv = mockConversations[convIndex];
    mockConversations.splice(convIndex, 1);
    mockConversations = [updatedConv, ...mockConversations];

    return simulateAxiosResponse({ userMessage, assistantMessage }, 1000); // 1s simulation delay
  },
};
