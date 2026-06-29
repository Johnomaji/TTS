export type Provider = 'aws-polly' | 'openai' | 'gemini' | 'xai';

export interface Voice {
  id: string;
  label?: string;
  gender?: 'F' | 'M';
  trait?: string;
}

export interface VoiceGroup {
  label: string;
  flag?: string;
  voices: Voice[];
}

export interface ProviderMeta {
  id: Provider;
  label: string;
  badge: string;
  tagline: string;
  defaultVoice: string;
}

export const PROVIDERS: ProviderMeta[] = [
  { id: 'aws-polly', label: 'AWS Polly', badge: '🔊', tagline: '32 voices · 9 accents', defaultVoice: 'Joanna' },
  { id: 'openai',   label: 'OpenAI',    badge: '◆',  tagline: '10 expressive voices',  defaultVoice: 'alloy'  },
  { id: 'gemini',   label: 'Gemini',    badge: '✦',  tagline: '30 celestial voices',   defaultVoice: 'Kore'   },
  { id: 'xai',      label: 'xAI Grok',  badge: '𝕏',  tagline: '5 personality voices',  defaultVoice: 'eve'    },
];

export const VOICE_GROUPS: Record<Provider, VoiceGroup[]> = {
  'aws-polly': [
    {
      label: 'US English', flag: '🇺🇸',
      voices: [
        { id: 'Joanna',   gender: 'F' },
        { id: 'Matthew',  gender: 'M' },
        { id: 'Salli',    gender: 'F' },
        { id: 'Joey',     gender: 'M' },
        { id: 'Kendra',   gender: 'F' },
        { id: 'Kimberly', gender: 'F' },
        { id: 'Danielle', gender: 'F' },
        { id: 'Gregory',  gender: 'M' },
        { id: 'Ruth',     gender: 'F' },
        { id: 'Stephen',  gender: 'M' },
        { id: 'Tiffany',  gender: 'F' },
        { id: 'Patrick',  gender: 'M' },
        { id: 'Justin',   gender: 'M', label: 'Justin ♟' },
        { id: 'Kevin',    gender: 'M', label: 'Kevin ♟'  },
        { id: 'Ivy',      gender: 'F', label: 'Ivy ♟'    },
      ],
    },
    {
      label: 'British', flag: '🇬🇧',
      voices: [
        { id: 'Amy',    gender: 'F' },
        { id: 'Brian',  gender: 'M' },
        { id: 'Emma',   gender: 'F' },
        { id: 'Arthur', gender: 'M' },
      ],
    },
    {
      label: 'Australian', flag: '🇦🇺',
      voices: [
        { id: 'Russell', gender: 'M' },
        { id: 'Nicole',  gender: 'F' },
        { id: 'Olivia',  gender: 'F' },
      ],
    },
    {
      label: 'Irish', flag: '🇮🇪',
      voices: [{ id: 'Niamh', gender: 'F' }],
    },
    {
      label: 'New Zealand', flag: '🇳🇿',
      voices: [{ id: 'Aria', gender: 'F' }],
    },
    {
      label: 'Singaporean', flag: '🇸🇬',
      voices: [{ id: 'Jasmine', gender: 'F' }],
    },
    {
      label: 'South African', flag: '🇿🇦',
      voices: [{ id: 'Ayanda', gender: 'F' }],
    },
    {
      label: 'Indian', flag: '🇮🇳',
      voices: [
        { id: 'Aditi',   gender: 'F' },
        { id: 'Raveena', gender: 'F' },
        { id: 'Kajal',   gender: 'F' },
      ],
    },
    {
      label: 'Welsh', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
      voices: [{ id: 'Geraint', gender: 'M' }],
    },
  ],

  'openai': [
    {
      label: 'OpenAI Voices',
      voices: [
        { id: 'alloy',   trait: 'Versatile, balanced'      },
        { id: 'ash',     trait: 'Clear, precise'           },
        { id: 'ballad',  trait: 'Warm, melodic'            },
        { id: 'coral',   trait: 'Warm, conversational', gender: 'F' },
        { id: 'echo',    trait: 'Resonant, expressive', gender: 'M' },
        { id: 'fable',   trait: 'Animated, storytelling'   },
        { id: 'nova',    trait: 'Upbeat, friendly',    gender: 'F' },
        { id: 'onyx',    trait: 'Deep, authoritative',  gender: 'M' },
        { id: 'sage',    trait: 'Calm, measured'            },
        { id: 'shimmer', trait: 'Soft, gentle',         gender: 'F' },
      ],
    },
  ],

  'gemini': [
    {
      label: 'Gemini Voices',
      voices: [
        { id: 'Zephyr',          trait: 'Bright'         },
        { id: 'Puck',            trait: 'Upbeat'         },
        { id: 'Charon',          trait: 'Informative'    },
        { id: 'Kore',            trait: 'Firm'           },
        { id: 'Fenrir',          trait: 'Excitable'      },
        { id: 'Leda',            trait: 'Youthful'       },
        { id: 'Enceladus',       trait: 'Breathy'        },
        { id: 'Iapetus',         trait: 'Clear'          },
        { id: 'Aoede',           trait: 'Breezy'         },
        { id: 'Calliope',        trait: 'Easy-going'     },
        { id: 'Autonoe',         trait: 'Bright'         },
        { id: 'Orus',            trait: 'Firm'           },
        { id: 'Umbriel',         trait: 'Easy-going'     },
        { id: 'Algieba',         trait: 'Smooth'         },
        { id: 'Despina',         trait: 'Smooth'         },
        { id: 'Erinome',         trait: 'Clear'          },
        { id: 'Algenib',         trait: 'Gravelly'       },
        { id: 'Rasalghul',       trait: 'Informative'    },
        { id: 'Laomedeia',       trait: 'Upbeat'         },
        { id: 'Achernar',        trait: 'Soft'           },
        { id: 'Alnilam',         trait: 'Firm'           },
        { id: 'Schedar',         trait: 'Even'           },
        { id: 'Gacrux',          trait: 'Mature'         },
        { id: 'Pulcherrima',     trait: 'Forward'        },
        { id: 'Achird',          trait: 'Friendly'       },
        { id: 'Zubenelgenubi',   trait: 'Casual'         },
        { id: 'Vindemiatrix',    trait: 'Gentle'         },
        { id: 'Sadachbia',       trait: 'Lively'         },
        { id: 'Sadaltager',      trait: 'Knowledgeable'  },
        { id: 'Sulafat',         trait: 'Warm'           },
      ],
    },
  ],

  'xai': [
    {
      label: 'Grok Voices',
      voices: [
        { id: 'eve', trait: 'Energetic, dynamic',     gender: 'F' },
        { id: 'ara', trait: 'Warm, approachable',     gender: 'F' },
        { id: 'rex', trait: 'Confident, bold',        gender: 'M' },
        { id: 'sal', trait: 'Smooth, professional',   gender: 'M' },
        { id: 'leo', trait: 'Authoritative, deep',    gender: 'M' },
      ],
    },
  ],
};
