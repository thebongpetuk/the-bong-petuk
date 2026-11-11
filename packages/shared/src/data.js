export const defaultContent = {
  meta: { title: 'The Bong Petuk | Creator Portfolio', description: 'The Bong Petuk by Tamal Majumder — influencer and UGC creator.', instagram: 'https://www.instagram.com/the_bong_petuk_/' },
  theme: { background: '#101010', surface: '#1D1D1D', text: '#F6F1E9', muted: '#ABA69F', accent: '#C5A46D', font: 'Inter', radius: 16, spacing: 1, hoverStyle: 'lift', hoverAccent: '#C5A46D', hoverStrength: 5, hoverSpeed: 'normal' },
  brand: { name: 'THE BONG PETUK', byline: 'by Tamal Majumder', tagline: 'Creating Content That Connects.', summary: 'Food, travel, fashion and lifestyle stories — thoughtfully created for people and brands.', location: 'Kolkata, India', heroImage: '', heroMobileImage: '', heroDesktopVideo: '', heroMobileVideo: '', heroDesktopType: 'image', heroMobileType: 'image', heroDesktopPosition: 'right', heroMobilePosition: 'below', heroOverlay: 15, profileImage: '', logo: '' },
  about: { eyebrow: 'BEHIND THE CREATOR', heading: 'The person behind the stories.', body: "Hello, I'm Tamal — the creator behind The Bong Petuk. What began with a love for food and discovering new places has grown into a creative space for sharing authentic experiences. I work with brands to translate ideas into compelling visuals and relatable digital storytelling." },
  metrics: [
    { id: 'followers', label: 'Instagram followers', value: '', period: '' },
    { id: 'reach', label: 'Accounts reached', value: '', period: '' },
    { id: 'views', label: 'Reel views', value: '', period: '' },
    { id: 'engagement', label: 'Engagement rate', value: '', period: '' }
  ],
  niches: [
    {id:'food',title:'Food & Dining',description:'Stories that bring flavours, restaurants and experiences to life.',image:''},
    {id:'travel',title:'Travel & Staycations',description:'Destination stories that invite people to explore.',image:''},
    {id:'fashion',title:'Fashion & Grooming',description:'Style-led, relatable product storytelling.',image:''},
    {id:'lifestyle',title:'Lifestyle & Experiences',description:'Everyday experiences, made memorable.',image:''}
  ],
  collaborations: [],
  reels: [],
  services: [
    {id:'influencer', title:'Influencer Collaborations',description:'Brand-focused campaigns shared with my audience.'},
    {id:'ugc',title:'UGC Content Creation',description:'Original content created for your brand channels, subject to agreed usage rights.'},
    {id:'hospitality',title:'Food & Hospitality Features',description:'Restaurant, café, hotel and staycation stories.'},
    {id:'events',title:'Events & Product Campaigns',description:'Event coverage, product showcases and campaign storytelling.'}
  ],
  contact: { email:'', whatsapp:'', whatsappMessage: 'Hello, I would like to discuss a collaboration with The Bong Petuk.', floatingWhatsapp: true, instagram:'https://www.instagram.com/the_bong_petuk_/', headline:'Your Brand. My Creativity. Our Next Story.', message:"Have a campaign, destination or experience you'd like to showcase? Let's create something worth watching." },
  sections: [
    {id:'hero',label:'Hero',visible:true},
    {id:'about',label:'About',visible:true},
    {id:'metrics',label:'Digital Impact',visible:true},
    {id:'niches',label:'Content Expertise',visible:true},
    {id:'collaborations',label:'Collaborations',visible:true},
    {id:'reels',label:'Featured Work',visible:true},
    {id:'services',label:'Services',visible:true},
    {id:'contact',label:'Contact',visible:true}
  ]
};
export const clone = (value) => JSON.parse(JSON.stringify(value));
export const normalizeContent = (value) => ({...clone(defaultContent), ...(value || {}), theme: {...defaultContent.theme, ...(value?.theme || {})}, brand: {...defaultContent.brand, ...(value?.brand || {})}, meta: {...defaultContent.meta, ...(value?.meta || {})}, about: {...defaultContent.about, ...(value?.about || {})}, contact: {...defaultContent.contact, ...(value?.contact || {})}});
