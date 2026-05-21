export type BinId = 'emergency' | 'info' | 'maybe';

export type FakeEmail = {
  id: string;
  bin: BinId;
  theme: string;
  fromWho: string;
  time: string;
  summary: string;
};

export const fakeEmails: FakeEmail[] = [
  {
    id: 'e1',
    bin: 'emergency',
    theme: 'Visa decision deadline',
    fromWho: 'Immigration NZ',
    time: '8:14am',
    summary: 'Reply with proof of address by 5pm today or your application is withdrawn.',
  },
  {
    id: 'e2',
    bin: 'info',
    theme: 'GitHub code',
    fromWho: 'GitHub',
    time: '8:22am',
    summary: 'GitHub code: 847291',
  },
  {
    id: 'e3',
    bin: 'maybe',
    theme: '40% off, today only',
    fromWho: 'Uniqlo',
    time: '8:30am',
    summary: 'Spring sale — extra 40% off basics. Ends midnight.',
  },
  {
    id: 'e4',
    bin: 'info',
    theme: 'Uber receipt',
    fromWho: 'Uber',
    time: '8:41am',
    summary: 'Trip total NZ$18.40 · paid Visa ••42',
  },
  {
    id: 'e5',
    bin: 'emergency',
    theme: 'Rent overdue',
    fromWho: 'Property manager',
    time: '8:55am',
    summary: 'Rent for unit 6B is 3 days late. Late fee applies after today.',
  },
  {
    id: 'e6',
    bin: 'maybe',
    theme: 'Weekly product digest',
    fromWho: 'Product Hunt',
    time: '9:02am',
    summary: 'This week\'s top launches — read at your leisure.',
  },
  {
    id: 'e7',
    bin: 'info',
    theme: 'Flight booking',
    fromWho: 'Air NZ',
    time: '9:14am',
    summary: 'Air NZ booking: PXR42M · AKL → WLG · Fri 23 May 7:30am',
  },
];

export const bins = [
  {
    id: 'emergency' as const,
    title: 'Emergency',
    pitch: 'Have 30s to go through truly important mails',
    longer: 'Visa deadlines, late rent, job offers, your mum says "call me". The mail you cannot afford to miss.',
    accent: '#d9483f',
  },
  {
    id: 'info' as const,
    title: 'Info',
    pitch: 'Collect info you need to refer to',
    longer: 'OTPs, tracking numbers, booking refs, voucher codes. Mailbin pulls out the exact value so you don\'t have to open the email.',
    accent: '#4f7f4c',
  },
  {
    id: 'maybe' as const,
    title: 'Maybe',
    pitch: 'Maybe when we have time',
    longer: 'Newsletters, promos, the FYI from your bank. Not urgent — swipe through later, or never.',
    accent: '#b27a3c',
  },
];
