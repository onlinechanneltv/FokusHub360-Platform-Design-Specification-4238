export const participantQuestions = {
  demographics: {
    title: "Demographics",
    description: "Basic demographic information",
    questions: [
      { id: "age", type: "number", label: "Age", required: true },
      { id: "gender", type: "select", label: "Gender", options: ["Male", "Female", "Non-binary", "Prefer not to say"], required: true },
      { id: "dateOfBirth", type: "date", label: "Date of Birth", required: true },
      { id: "ethnicity", type: "select", label: "Ethnicity", options: ["White", "Black/African American", "Hispanic/Latino", "Asian", "Native American", "Pacific Islander", "Mixed", "Other"], required: false },
      { id: "country", type: "text", label: "Country", required: true },
      { id: "state", type: "text", label: "State/Province", required: true },
      { id: "city", type: "text", label: "City", required: true },
      { id: "zipCode", type: "text", label: "ZIP/Postal Code", required: false },
      { id: "maritalStatus", type: "select", label: "Marital Status", options: ["Single", "Married", "Divorced", "Widowed", "In a relationship"], required: false },
      { id: "householdSize", type: "number", label: "Household Size", required: false },
      { id: "children", type: "select", label: "Do you have children?", options: ["Yes", "No"], required: false },
      { id: "childrenAges", type: "multiselect", label: "Children's Age Groups", options: ["0-2", "3-5", "6-12", "13-17", "18+"], required: false },
      { id: "primaryLanguage", type: "text", label: "Primary Language", required: false },
      { id: "secondaryLanguages", type: "textarea", label: "Other Languages Spoken", required: false }
    ]
  },

  beliefs: {
    title: "Beliefs & Values",
    description: "Personal beliefs and value systems",
    questions: [
      { id: "religion", type: "select", label: "Religious Affiliation", options: ["Christianity", "Islam", "Judaism", "Hinduism", "Buddhism", "Atheist", "Agnostic", "Other", "Prefer not to say"], required: false },
      { id: "religiosity", type: "scale", label: "How religious would you consider yourself?", scale: [1, 10], required: false },
      { id: "politicalAffiliation", type: "select", label: "Political Affiliation", options: ["Very Liberal", "Liberal", "Moderate", "Conservative", "Very Conservative", "Independent", "Other", "Prefer not to say"], required: false },
      { id: "environmentalConcern", type: "scale", label: "How concerned are you about environmental issues?", scale: [1, 10], required: false },
      { id: "socialJustice", type: "scale", label: "How important are social justice issues to you?", scale: [1, 10], required: false },
      { id: "traditionalValues", type: "scale", label: "How important are traditional family values to you?", scale: [1, 10], required: false },
      { id: "diversityImportance", type: "scale", label: "How important is diversity and inclusion to you?", scale: [1, 10], required: false },
      { id: "charityDonation", type: "select", label: "Do you regularly donate to charity?", options: ["Yes, monthly", "Yes, occasionally", "Rarely", "Never"], required: false },
      { id: "volunteerWork", type: "select", label: "Do you volunteer for causes?", options: ["Regularly", "Occasionally", "Rarely", "Never"], required: false },
      { id: "coreValues", type: "multiselect", label: "What are your core values?", options: ["Family", "Success", "Freedom", "Security", "Adventure", "Creativity", "Service", "Knowledge", "Tradition", "Innovation"], required: false }
    ]
  },

  lifestyle: {
    title: "Lifestyle & Interests",
    description: "Daily habits, hobbies, and lifestyle preferences",
    questions: [
      { id: "hobbies", type: "multiselect", label: "Hobbies & Interests", options: ["Reading", "Gaming", "Sports", "Cooking", "Travel", "Photography", "Music", "Art", "Gardening", "Fitness", "Technology", "Fashion", "DIY", "Collecting"], required: false },
      { id: "workLifeBalance", type: "scale", label: "How would you rate your work-life balance?", scale: [1, 10], required: false },
      { id: "fitnessLevel", type: "select", label: "Fitness Level", options: ["Very Active", "Moderately Active", "Somewhat Active", "Not Very Active", "Sedentary"], required: false },
      { id: "exerciseFrequency", type: "select", label: "Exercise Frequency", options: ["Daily", "4-6 times/week", "2-3 times/week", "Once a week", "Rarely", "Never"], required: false },
      { id: "dietType", type: "select", label: "Dietary Preferences", options: ["No restrictions", "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", "Gluten-free", "Other"], required: false },
      { id: "smokingStatus", type: "select", label: "Smoking Status", options: ["Never smoked", "Former smoker", "Occasional smoker", "Regular smoker"], required: false },
      { id: "drinkingHabits", type: "select", label: "Alcohol Consumption", options: ["Never", "Rarely", "Socially", "Regularly", "Daily"], required: false },
      { id: "sleepHours", type: "number", label: "Average hours of sleep per night", required: false },
      { id: "stressLevel", type: "scale", label: "Current stress level", scale: [1, 10], required: false },
      { id: "socializing", type: "select", label: "How often do you socialize with friends?", options: ["Daily", "Several times a week", "Weekly", "Monthly", "Rarely"], required: false },
      { id: "travelFrequency", type: "select", label: "How often do you travel?", options: ["Multiple times a year", "Once a year", "Every few years", "Rarely", "Never"], required: false },
      { id: "petOwnership", type: "multiselect", label: "Do you own pets?", options: ["Dogs", "Cats", "Birds", "Fish", "Reptiles", "Other", "No pets"], required: false }
    ]
  },

  career: {
    title: "Career & Education",
    description: "Professional background and educational history",
    questions: [
      { id: "employmentStatus", type: "select", label: "Employment Status", options: ["Full-time employed", "Part-time employed", "Self-employed", "Unemployed", "Student", "Retired", "Homemaker"], required: true },
      { id: "industry", type: "select", label: "Industry", options: ["Technology", "Healthcare", "Education", "Finance", "Retail", "Manufacturing", "Government", "Non-profit", "Entertainment", "Real Estate", "Transportation", "Other"], required: false },
      { id: "jobTitle", type: "text", label: "Job Title", required: false },
      { id: "workExperience", type: "select", label: "Years of Work Experience", options: ["0-2", "3-5", "6-10", "11-15", "16-20", "20+"], required: false },
      { id: "incomeLevel", type: "select", label: "Annual Household Income", options: ["Under $25,000", "$25,000-$49,999", "$50,000-$74,999", "$75,000-$99,999", "$100,000-$149,999", "$150,000+", "Prefer not to say"], required: false },
      { id: "educationLevel", type: "select", label: "Highest Education Level", options: ["High School", "Some College", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate", "Professional Degree"], required: false },
      { id: "fieldOfStudy", type: "text", label: "Field of Study", required: false },
      { id: "workFromHome", type: "select", label: "Work Arrangement", options: ["Fully remote", "Hybrid", "Fully in-office", "Not applicable"], required: false },
      { id: "managementRole", type: "select", label: "Do you manage other people?", options: ["Yes", "No"], required: false },
      { id: "careerGoals", type: "textarea", label: "Career Goals/Aspirations", required: false }
    ]
  },

  media: {
    title: "Media & Entertainment",
    description: "Content consumption and entertainment preferences",
    questions: [
      { id: "tvGenres", type: "multiselect", label: "Favorite TV Genres", options: ["Drama", "Comedy", "Action", "Horror", "Sci-Fi", "Documentary", "Reality TV", "News", "Sports", "Animation", "Romance", "Thriller"], required: false },
      { id: "movieGenres", type: "multiselect", label: "Favorite Movie Genres", options: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Documentary", "Animation", "Fantasy", "Adventure", "Mystery"], required: false },
      { id: "streamingPlatforms", type: "multiselect", label: "Streaming Platforms Used", options: ["Netflix", "Amazon Prime", "Disney+", "Hulu", "HBO Max", "Apple TV+", "Paramount+", "YouTube Premium", "Spotify", "Other"], required: false },
      { id: "tvWatchTime", type: "select", label: "Daily TV/Streaming Time", options: ["Less than 1 hour", "1-2 hours", "3-4 hours", "5-6 hours", "More than 6 hours"], required: false },
      { id: "musicGenres", type: "multiselect", label: "Favorite Music Genres", options: ["Pop", "Rock", "Hip-Hop", "Country", "Classical", "Jazz", "Electronic", "R&B", "Folk", "Alternative", "Metal", "Reggae"], required: false },
      { id: "newsConsumption", type: "select", label: "How often do you consume news?", options: ["Multiple times daily", "Daily", "Several times a week", "Weekly", "Rarely"], required: false },
      { id: "newsSources", type: "multiselect", label: "Primary News Sources", options: ["TV News", "Online News Sites", "Social Media", "Newspapers", "Radio", "Podcasts", "News Apps"], required: false },
      { id: "bookReading", type: "select", label: "How often do you read books?", options: ["Daily", "Weekly", "Monthly", "Occasionally", "Rarely", "Never"], required: false },
      { id: "bookGenres", type: "multiselect", label: "Favorite Book Genres", options: ["Fiction", "Non-fiction", "Biography", "Self-help", "Mystery", "Romance", "Sci-Fi", "Fantasy", "History", "Business"], required: false },
      { id: "podcastListening", type: "select", label: "Podcast Listening Frequency", options: ["Daily", "Several times a week", "Weekly", "Occasionally", "Never"], required: false },
      { id: "gamingHabits", type: "select", label: "Gaming Frequency", options: ["Daily", "Several times a week", "Weekly", "Occasionally", "Never"], required: false },
      { id: "gamingPlatforms", type: "multiselect", label: "Gaming Platforms", options: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile", "VR", "Don't game"], required: false }
    ]
  },

  technology: {
    title: "Technology Usage",
    description: "Digital habits and technology preferences",
    questions: [
      { id: "primaryDevice", type: "select", label: "Primary Device", options: ["Smartphone", "Laptop", "Desktop", "Tablet"], required: false },
      { id: "operatingSystem", type: "select", label: "Preferred Operating System", options: ["iOS", "Android", "Windows", "macOS", "Linux"], required: false },
      { id: "internetUsage", type: "select", label: "Daily Internet Usage", options: ["1-2 hours", "3-4 hours", "5-6 hours", "7-8 hours", "More than 8 hours"], required: false },
      { id: "socialMediaPlatforms", type: "multiselect", label: "Social Media Platforms Used", options: ["Facebook", "Instagram", "Twitter/X", "LinkedIn", "TikTok", "YouTube", "Snapchat", "Pinterest", "Reddit", "Discord"], required: false },
      { id: "socialMediaTime", type: "select", label: "Daily Social Media Time", options: ["Less than 30 minutes", "30-60 minutes", "1-2 hours", "3-4 hours", "More than 4 hours"], required: false },
      { id: "onlineShoppingFreq", type: "select", label: "Online Shopping Frequency", options: ["Daily", "Weekly", "Monthly", "Occasionally", "Rarely"], required: false },
      { id: "techAdoption", type: "select", label: "Technology Adoption Style", options: ["Early adopter", "Fast follower", "Mainstream", "Late adopter", "Laggard"], required: false },
      { id: "smartDevices", type: "multiselect", label: "Smart Devices Owned", options: ["Smart TV", "Smart Speaker", "Smart Watch", "Smart Home System", "Smart Thermostat", "Smart Lights", "None"], required: false },
      { id: "appCategories", type: "multiselect", label: "Most Used App Categories", options: ["Social Media", "Entertainment", "Productivity", "Gaming", "Shopping", "News", "Finance", "Health", "Education", "Travel"], required: false },
      { id: "privacyConcern", type: "scale", label: "How concerned are you about online privacy?", scale: [1, 10], required: false },
      { id: "adBlocker", type: "select", label: "Do you use ad blockers?", options: ["Yes, always", "Sometimes", "Rarely", "Never"], required: false }
    ]
  },

  buying: {
    title: "Buying Behavior",
    description: "Shopping habits and consumer preferences",
    questions: [
      { id: "shoppingFrequency", type: "select", label: "Shopping Frequency", options: ["Daily", "Several times a week", "Weekly", "Bi-weekly", "Monthly", "Occasionally"], required: false },
      { id: "preferredShoppingMethod", type: "select", label: "Preferred Shopping Method", options: ["Online only", "In-store only", "Mix of both", "Depends on product"], required: false },
      { id: "brandLoyalty", type: "scale", label: "How brand loyal are you?", scale: [1, 10], required: false },
      { id: "priceVsQuality", type: "select", label: "Price vs Quality Priority", options: ["Always cheapest option", "Usually low price", "Balance price/quality", "Usually high quality", "Always premium"], required: false },
      { id: "impulseBuying", type: "scale", label: "How often do you make impulse purchases?", scale: [1, 10], required: false },
      { id: "researchHabits", type: "select", label: "How much do you research before buying?", options: ["Extensive research", "Moderate research", "Some research", "Minimal research", "No research"], required: false },
      { id: "reviewImportance", type: "scale", label: "How important are online reviews to you?", scale: [1, 10], required: false },
      { id: "sustainabilityImportance", type: "scale", label: "How important is sustainability in purchasing?", scale: [1, 10], required: false },
      { id: "preferredPayment", type: "multiselect", label: "Preferred Payment Methods", options: ["Credit Card", "Debit Card", "PayPal", "Apple Pay", "Google Pay", "Buy Now Pay Later", "Cash", "Bank Transfer"], required: false },
      { id: "subscriptionServices", type: "multiselect", label: "Subscription Services You Pay For", options: ["Streaming", "Music", "Software", "News", "Fitness", "Food Delivery", "Shopping", "Gaming", "None"], required: false },
      { id: "influencerImpact", type: "scale", label: "How much do influencers affect your purchases?", scale: [1, 10], required: false },
      { id: "returnsFrequency", type: "select", label: "How often do you return purchases?", options: ["Frequently", "Occasionally", "Rarely", "Never"], required: false }
    ]
  },

  psychographics: {
    title: "Personality & Psychology",
    description: "Personality traits and psychological preferences",
    questions: [
      { id: "personalityType", type: "select", label: "Personality Type (if known)", options: ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP", "Don't know"], required: false },
      { id: "introvertExtrovert", type: "scale", label: "Introvert (1) to Extrovert (10)", scale: [1, 10], required: false },
      { id: "riskTolerance", type: "scale", label: "Risk Tolerance", scale: [1, 10], required: false },
      { id: "decisionMaking", type: "select", label: "Decision Making Style", options: ["Quick decisions", "Moderate deliberation", "Extensive analysis", "Depends on situation"], required: false },
      { id: "learningStyle", type: "select", label: "Preferred Learning Style", options: ["Visual", "Auditory", "Kinesthetic", "Reading/Writing", "Mixed"], required: false },
      { id: "communicationStyle", type: "select", label: "Communication Style", options: ["Direct", "Diplomatic", "Analytical", "Expressive", "Mixed"], required: false },
      { id: "stressResponse", type: "select", label: "How do you handle stress?", options: ["Face it head-on", "Seek support", "Take time alone", "Avoid/procrastinate", "Mixed approach"], required: false },
      { id: "motivationFactors", type: "multiselect", label: "What motivates you most?", options: ["Achievement", "Recognition", "Money", "Freedom", "Security", "Relationships", "Purpose", "Learning", "Adventure"], required: false },
      { id: "optimismLevel", type: "scale", label: "Optimism Level", scale: [1, 10], required: false },
      { id: "changeAdaptability", type: "scale", label: "How well do you adapt to change?", scale: [1, 10], required: false },
      { id: "planningVsSpontaneous", type: "scale", label: "Planner (1) to Spontaneous (10)", scale: [1, 10], required: false },
      { id: "perfectionism", type: "scale", label: "Perfectionism Level", scale: [1, 10], required: false }
    ]
  }
};

export const getQuestionsByCategory = (category) => {
  return participantQuestions[category] || { questions: [] };
};

export const getAllQuestions = () => {
  return Object.values(participantQuestions).reduce((all, category) => {
    return [...all, ...category.questions];
  }, []);
};

export const getTotalQuestionCount = () => {
  return getAllQuestions().length;
};