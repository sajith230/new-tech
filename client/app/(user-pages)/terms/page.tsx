import React from "react";
import TermsReveal from "@/components/user/terms-page/TermsReveal";


const TermsPage = () => (
	<>
		
		<section className="relative bg-white dark:bg-[#181818] min-h-screen pt-[6em] pb-[3em]">
			<div className="from-primary absolute left-0 top-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]" />
			<div className="from-primary absolute right-0 bottom-0 aspect-square w-2/5 translate-x-1/3 translate-y-1/3 rounded-full bg-radial to-transparent blur-[5em]" />
			<div className="container mx-auto max-w-7xl px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
					<span className="bg-primary text-foreground w-fit rounded-full px-[1.5em] py-[0.7em] text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[32px] mt-0 mb-3 block mx-auto text-center mb-20">Terms and Conditions for TECHCD</span>
					       <p className="mt-6 mb-6 text-gray-700 dark:text-gray-300">Last Updated: March 12, 2026</p>
					   <p className="mb-6 text-gray-700 dark:text-gray-300 text-center mb-6">Welcome to TECHCD (<a href="https://techcd.lk/" className="underline text-primary" target="_blank" rel="noopener noreferrer">https://techcd.lk/</a>). These Terms and Conditions outline the rules and regulations for the use of TECHCD's Website, Community Forums, and E-commerce Store.</p>
				   <p className="mb-3 text-gray-700 dark:text-gray-300 text-center">By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use TECHCD if you do not agree to all the terms and conditions stated on this page.</p>
				<div className="mt-11 mb-15 w-32 h-1 bg-primary rounded mx-auto mb-6"></div>
				<div className="space-y-6">
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-bold mt-8 mb-3 text-primary">1. Introduction</h2>
						<p className="text-gray-700 dark:text-gray-300">TECHCD is an online platform based in Sri Lanka designed to guide individuals in exploring opportunities in freelancing, content creation, e-commerce, and digital skills. The website offers educational tutorials, a community forum, blog posts, and an official merchandise store.</p>
					</div>
					</TermsReveal>
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-bold mt-8 mb-3 text-primary">2. Intellectual Property Rights</h2>
						<p className="text-gray-700 dark:text-gray-300">Unless otherwise stated, TECHCD and/or its licensors own the intellectual property rights for all material on this website (including tutorials, videos, text, and graphics). All intellectual property rights are reserved.</p>
						<p className="text-gray-700 dark:text-gray-300 mb-6 mt-4">You may view and/or print pages from <a href="https://techcd.lk/" className="underline text-primary" target="_blank" rel="noopener noreferrer">https://techcd.lk/</a> for your own personal use, subject to restrictions set in these terms and conditions.</p>
							<ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-6 space-y-3">
							<li>Republish material from TECHCD without prior consent.</li>
							<li>Sell, rent, or sub-license material from TECHCD.</li>
							<li>Reproduce, duplicate, or copy tutorials or paid content for commercial purposes.</li>
						</ul>
					</div>
					</TermsReveal>
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-bold mt-8 mb-3 text-primary">3. Earnings and Financial Disclaimer</h2>
						<p className="text-gray-700 dark:text-gray-300 mb-4">TECHCD provides educational content, tutorials, and shared experiences related to freelancing, digital marketing, crypto-currency (e.g., Binance, USDT, Bitcoin), trading (e.g., XM), and e-commerce.</p>
						<ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-3">
							<li><strong>No Guarantees:</strong> We do not guarantee that you will earn any specific amount of money by using the techniques and ideas presented on this website. Earning potential is entirely dependent on the person using our ideas, their skills, and the time they dedicate.</li>
							<li><strong>Not Financial Advice:</strong> The information provided on TECHCD is strictly for educational purposes and should not be construed as professional financial, legal, or tax advice.</li>
						</ul>
					</div>
					</TermsReveal>
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-bold mt-8 mb-3 text-primary">4. User Accounts and Security</h2>
						<ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-3">
							<li>To access the community forum or make purchases, you may be required to register an account.</li>
							<li>You are responsible for maintaining the confidentiality of your account and password.</li>
							<li>You agree to accept responsibility for all activities that occur under your account.</li>
							<li>We reserve the right to terminate accounts, remove or edit content, or cancel orders at our sole discretion if we detect fraudulent activity or a violation of these terms.</li>
						</ul>
					</div>
					</TermsReveal>
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-semibold mt-6 mb-2 text-primary">5. Forum and Community Guidelines</h2>
						<ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-3">
							<li><strong>Respectful Conduct:</strong> Harassment, hate speech, racism, and abusive language are strictly prohibited.</li>
							<li><strong>No Spam:</strong> You will not post unauthorized promotional links, spam, or malicious software.</li>
							<li><strong>Content Ownership:</strong> By posting on the forum, you grant TECHCD a non-exclusive right to use, reproduce, and edit your comments.</li>
							<li><strong>Moderation:</strong> We reserve the right to monitor all forum messages and remove any content that is deemed inappropriate, offensive, or violates these Terms and Conditions.</li>
						</ul>
					</div>
					</TermsReveal>
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-semibold mt-6 mb-2 text-primary">6. E-commerce, Returns, and Refunds Policy</h2>
						<ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-5">
							<li><strong>Pricing and Availability:</strong> All prices for our products are subject to change without notice. We reserve the right to modify or discontinue products at any time.</li>
							<li><strong>Payments:</strong> We use third-party payment gateways (such as Ez Cash, Dialog, etc.). By making a purchase, you agree to the terms of these third-party processors.</li>
							<li><strong>Return Policy for Physical Merchandise (e.g., T-Shirts):</strong> We accept returns and exchanges within 14 days of the delivery date.<br />To be eligible for a return or exchange, your item must be unused, unwashed, in the same condition that you received it, and in its original packaging.</li>
							<li><strong>Defective or Damaged Items:</strong> If you receive a defective or damaged item, please contact us immediately with photo proof. We will arrange a replacement or full refund at no additional shipping cost to you.</li>
							<li><strong>Sizing Issues or Change of Mind:</strong> If you wish to exchange an item for a different size, you will be responsible for paying your own shipping costs for returning your item.</li>
							<li><strong>Refund Policy for Digital Products:</strong> Due to the nature of digital goods (downloadable content, access to exclusive tutorials, etc.), all sales for digital products are final and non-refundable once access has been granted, unless the digital file is proven to be corrupted or inaccessible.</li>
							<li><strong>How to Initiate a Return:</strong> To start a return or exchange, please email our support team at [Insert Email, e.g., support@techcd.lk] with your order number and reason for return. Once your return is received and inspected, we will notify you of the approval or rejection of your refund/exchange.</li>
							<li><strong>Processing Refunds:</strong> Approved refunds will be processed, and a credit will automatically be applied to your original method of payment (or offered as store credit) within 7-10 business days.</li>
						</ul>
					</div>
					</TermsReveal>
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-semibold mt-6 mb-2 text-primary">7. Third-Party Links and Affiliations</h2>
						<ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-5">
							<li>Our website mentions or links to third-party services and clients such as Ali Express, Binance, XM, Fiverr, Shutterstock, Dialog, and SLT Mobitel.</li>
							<li>TECHCD has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</li>
							<li><strong>Affiliate Links:</strong> Some links on our website may be affiliate links. This means TECHCD may earn a small commission if you click on the link or make a purchase, at no additional cost to you.</li>
						</ul>
					</div>
					</TermsReveal>
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-semibold mt-6 mb-2 text-primary">8. Limitation of Liability</h2>
						<p className="text-gray-700 dark:text-gray-300">In no event shall TECHCD, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website. TECHCD shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.</p>
					</div>
					</TermsReveal>
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-semibold mt-6 mb-2 text-primary">9. Indemnification</h2>
						<p className="text-gray-700 dark:text-gray-300">You hereby indemnify to the fullest extent TECHCD from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
					</div>
					</TermsReveal>
					<TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-semibold mt-6 mb-2 text-primary">10. Modifications to Terms</h2>
						<p className="text-gray-700 dark:text-gray-300">TECHCD is permitted to revise these Terms at any time as it sees fit. By using this website, you are expected to review these Terms on a regular basis to ensure you understand all rules governing the use of this website.</p>
					</div>
					</TermsReveal>
					<div className="mb-20">
						<h2 className="text-3xl font-semibold mt-6 mb-2 text-primary">11. Governing Law & Jurisdiction</h2>
						<p className="text-gray-700 dark:text-gray-300">These Terms will be governed by and interpreted in accordance with the laws of the Democratic Socialist Republic of Sri Lanka, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Sri Lanka for the resolution of any disputes.</p>
					</div>
					<div>
						<h2 className="text-3xl font-semibold mt-6 mb-2 text-primary">12. Contact Information</h2>
						<ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-3">
							<li>Email: <a href="mailto:techcd@gmail.com" className=" text-primary">techcd@gmail.com</a></li>
							<li>Website: <a href="https://techcd.lk/contact" className="text-primary">https://techcd.lk/contact</a></li>
						</ul>
					</div>
				</div>
			</div>
		</section>

	</>
);

export default TermsPage;
