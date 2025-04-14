# **AspireScholar**

## **Project Overview**

**AspireScholar** is a **MERN stack** based platform that helps students easily apply for scholarships. It provides a user-friendly interface for students to apply, track, and manage their scholarships, as well as for admins to manage and update scholarships. The platform features a **chatbot** to answer any questions, detailed application forms, and an admin panel for scholarship management.

## **Tech Stack**
- **Frontend**: React.js, Redux, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **AI Chatbot**: ChatGPT for answering any questions
- **Other Tools**: React Hook Form, Zod for validation, File upload functionality

## **Features**
1. **Home Page**:  
   - The **homepage** features a **smart AI-powered chatbot** that can answer any question related to scholarships, your studies, or general queries.
   - **Sign In and Login pages** for users to access their accounts.
   - **Manual**: A detailed guide explaining how to use the website.

2. **User Dashboard**:
   - Once logged in, the **dashboard** shows a list of **applied scholarships** and their current status.
   
3. **Scholarship Page**:
   - Users can view a list of scholarships and **filter** based on the **amount**, **student type**, and **student caste**.
   
4. **Scholarship Application**:
   - Students can apply for a scholarship by clicking on any available scholarship.
   - The application form will display the **scholarship details** and the **required documents** for submission.
   - Students need to provide **Student Information**, **Parent Information**, and **Upload Documents** before **submitting** the application.

5. **Admin Panel**:
   - Only one **Admin** exists for the platform. Admins can:
     - **Create, Edit, and Search Scholarships**.
     - View and manage **student applications**.
     - Update the application status. If a student is approved for one scholarship, all their other applications will be **automatically rejected**.
     - Prevent students from applying for multiple scholarships.

6. **Status Updates**:
   - After submission, students can **wait for their application status** to be updated by the admin. Once approved, the student’s application for other scholarships will be rejected automatically.

---

## **Setup Instructions**

### **Clone the Repository**

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/aspire-scholar.git
