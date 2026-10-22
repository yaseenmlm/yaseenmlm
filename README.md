# Hi, I'm Yaseen 👋

**Computing (AI option) student at Queen's University · ML, NLP & full-stack engineering**

I build things that turn messy data and manual processes into tools people actually use. Most recently I've been an intern at **BMO** (Audit AI & Analytics) and **BMC Software**, working on LLM workflows, data pipelines, and test automation.

## 🔭 What I'm up to
- 🎓 B.Sc. Computing (AI Option), Minor in Economics, Queen's University (2024–2028)
- 🧠 Fine-tuning transformers and exploring topic modelling on tweets ([Machine-Learning-Projects](https://github.com/yaseenmlm/Machine-Learning-Projects))
- 🩺 Built **[Clinic Intake](https://github.com/yaseenmlm/clinic-intake)**, a multilingual waiting-room intake form that gives doctors an AI-organized summary of each patient's answers
- 📚 Building **QU Lecture Library**, a platform that turns missed lecture recordings into AI-generated notes, flashcards, and quizzes

## 💼 Experience
- **BMO Financial Group**, Data Analyst Intern, Audit AI & Analytics (2026): Python pipelines on AWS SageMaker, LLM workflows with AWS Bedrock, Power Platform automation
- **BMC Software**, Software Engineer Intern (2025): React/TypeScript + Node/Flask test-automation dashboard, LangChain + Playwright

## 🛠️ Toolbox
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![Hugging Face](https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## 📌 Featured projects
| Project | Highlights |
|---|---|
| [Machine-Learning-Projects](https://github.com/yaseenmlm/Machine-Learning-Projects) | **Disaster Tweet Classifier**: DistilBERT fine-tuned in PyTorch, 81.5% accuracy / 0.81 F1. **Company Tweet Topic Analyzer**: BERTopic + UMAP + HDBSCAN surfacing 58 topics from 2,000+ tweets |
| [clinic-intake](https://github.com/yaseenmlm/clinic-intake) | **Multilingual clinic intake + AI summary**: one-question-per-screen patient form in English, French, Punjabi and Hindi, designed for elderly and low-literacy patients. The doctor gets an English summary (Gemini or Claude at temperature 0), translations of each answer, and an automated check that flags any medication name or number missing from the summary. Node.js/Express, encrypted storage with auto-deletion after 24 h |


## 🩺 Project spotlight: [Clinic Intake](https://github.com/yaseenmlm/clinic-intake)

**A waiting-room intake app that turns patients' answers, in their own language, into a clean English summary for the doctor.**

Patients fill in a short form on a clinic tablet or their own phone. The doctor opens a dashboard and gets an AI-organized summary at the top, with every original answer and its English translation underneath.

### What it does
**For patients**
- 🌐 **4 languages:** English, French, Punjabi (Gurmukhi) and Hindi (Devanagari). Patients can type answers in any language.
- 👵 **Built for elderly and low-literacy patients:** one question per screen, large text and buttons, a progress bar, and Back/Next on every screen. Date of birth is entered as day/month/year boxes instead of a calendar.
- ❓ **Questions:** symptoms, when they started (a date *or* free text like "about 2 weeks ago"), whether the problem is constant or comes and goes, past episodes and what helped, and any treatment taken before the visit. Follow-up questions appear only when the patient answers "Yes".
- ✅ **Review screen:** patients can check and edit every answer before submitting, then see a confirmation in their own language.

**For the doctor**
- 📋 **Dashboard:** lists submitted patients with name, time submitted and language, behind a separate doctor login.
- 🤖 **AI summary in English** in a fixed format: chief complaint, onset, pattern/duration, previous episodes, and treatment before the visit.
- 🔤 **Answer table:** each question with the patient's exact original answer, plus an English translation labelled "Translated" when the answer wasn't in English.

### Keeping the AI faithful
- **Strict system prompt:** the model only organizes. It may not add, infer, diagnose or suggest anything; it copies medication names and doses exactly as written; and it marks unclear answers with `[unclear]` instead of resolving them.
- **Temperature 0** for both the summary and the translations.
- **Automated completeness check:** after each summary, the app confirms that every medication name and every number in the patient's answers appears in the summary, including numbers written in Gurmukhi or Devanagari digits. Anything missing shows up as a warning to the doctor.
- **Swappable AI provider:** Google Gemini or Anthropic Claude, chosen with one setting.

### Privacy & security
- 🔒 Patient answers are never stored in the browser. Submissions are encrypted on the server with **AES-256-GCM** and **deleted automatically after 24 hours** (configurable).
- 🙈 The patient's name and date of birth are never sent to the AI.
- 🛡️ Doctor sessions use HttpOnly, SameSite=Strict cookies and lock out after repeated failed logins. The app also sets a strict Content Security Policy and rate-limits requests.
- 🧽 Shared tablets reset themselves after inactivity and after each submission, so the next patient can't see earlier answers.

### Built with
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-D97757?style=flat-square&logo=claude&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

Plain HTML/CSS/JS front end with no framework · translation files make it easy to add new languages · tested with Node's built-in test runner

## 📊 Stats
![Yaseen's GitHub stats](https://github-readme-stats.vercel.app/api?username=yaseenmlm&show_icons=true&theme=tokyonight&hide_border=true)
![Top languages](https://github-readme-stats.vercel.app/api/top-langs/?username=yaseenmlm&layout=compact&theme=tokyonight&hide_border=true)

## 📫 Let's connect
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yaseenmalam)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yaseenmalam1@gmail.com)
