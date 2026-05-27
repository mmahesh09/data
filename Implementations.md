Product Information Assistant UI & Backend Prompt
Build a clean AI-assisted product information platform with two user roles: Admin and End User.
Goal
The application should allow an admin to upload product-related data into the backend, while end users can only access, search, and view that information. End users should be able to ask questions through an AI-style prompt box or browse product details through a product menu.
User Roles
Admin
The admin should be able to upload product-related data into the system. This data may include product names, descriptions, features, specifications, documents, pricing, categories, FAQs, or any other relevant product information.
Once the admin uploads the data, it should be stored in the backend and made available for search, retrieval, and product detail display.
End User
The end user should only have access to view and query the uploaded information. The end user should not be able to upload, edit, or delete any backend data. Their role is limited to asking questions, viewing answers, and browsing product details.
Main Home Page
The main home page should have a modern AI-style interface similar to the provided ThinkAI reference design. The UI should be clean, professional, user-friendly, and centered on the page.
There should be a prompt box on the home page where users can type and ask questions about a product or related uploaded data. For example, the user may ask about a product feature, product comparison, product specification, or any other information available in the backend.
Once the user submits a question, the frontend should send the query to the backend. The backend should process the question, search the uploaded data, and return the most relevant information. The response should then be displayed clearly on the page in an easy-to-read format.
The home page should also include a Product menu. When the user clicks on the Product menu, it should display a list of available products such as Product A, Product B, Product C, and so on. These product names should come dynamically from the backend data uploaded by the admin, not from hardcoded frontend values.
Product Page Navigation
When the user clicks on a product from the Product menu, the selected product should open on a new dedicated product details page.
For example, if the user clicks Product A, the application should navigate to a new page for Product A and display only the information related to that selected product.
Product Details Page
The product details page should have a clean and professional layout. The product information should be displayed in the center of the screen so that the page looks balanced and easy to navigate.
The page should contain four separate container boxes arranged in a structured layout, preferably in a two-by-two grid similar to the provided card-based reference image. Each container should organize a different type of product information.
The four containers can include:
Product Overview  
This section should explain what the product is, its purpose, and the main value it provides.
Key Features  
This section should highlight the most important features, benefits, or capabilities of the product.
Specifications / Details  
This section should display structured information such as technical specifications, category, pricing, usage details, product data, or other relevant attributes.
Additional Information / Recommendations  
This section can include related insights, use cases, recommendations, related products, FAQs, or AI-generated notes based on the backend data.
UI Design Requirements
The product page should be simple, user-friendly, and easy to navigate. The main focus should be helping the user quickly understand the selected product.
The four container boxes should be visually clear, evenly spaced, and centered on the page. Each container should have a clear heading, short description, and well-organized content. The layout should look balanced, modern, and professional.
The design should be responsive so it works properly on desktop, tablet, and mobile screens.
Functional Flow
Admin uploads product data into the backend.
Backend stores and processes the uploaded data.
End user opens the home page.
End user can ask a question in the prompt box.
Frontend sends the question to the backend.
Backend searches the uploaded data and returns the relevant answer.
Frontend displays the answer clearly on the home page.
End user can open the Product menu.
Product menu displays available products dynamically from the backend.
End user clicks a product, such as Product A.
Application opens a new product details page.
Product details page displays the selected product information inside four centered container boxes.
Final Expected Result
The final application should provide an AI-powered product information experience. Users should be able to ask questions directly through the home page prompt box and receive backend-driven answers. Users should also be able to browse products from the Product menu and view each product on a dedicated details page with four organized information containers.
The overall experience should be clean, modern, responsive, and focused on making product information easy to access and understand.
