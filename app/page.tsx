import FbGuard from '@/components/FbGuard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FbGuardPage() {
  return (
    <div className="container mx-auto py-10 px-4 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Facebook Picture Guard Manager</h1>
      <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
        <FbGuard initialAction="enable" />
      </div>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Facebook Picture Guard?</AccordionTrigger>
            <AccordionContent>
              Facebook Picture Guard is a feature that adds an extra layer of protection to your profile picture. When enabled, it prevents others from downloading, sharing, or taking screenshots of your profile picture.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I enable or disable Picture Guard?</AccordionTrigger>
            <AccordionContent>
              You can use the form above to enable or disable Picture Guard. Simply enter your Facebook email (or phone number) and password, then toggle the switch to enable or disable the feature. Click the submit button to apply the changes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it safe to enter my Facebook credentials here?</AccordionTrigger>
            <AccordionContent>
              This tool is for demonstration purposes only. In a real-world scenario, you should never enter your Facebook credentials on third-party websites. Always manage your Facebook settings directly through the official Facebook website or app.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What should I do if I encounter an error?</AccordionTrigger>
            <AccordionContent>
              If you encounter an error, first check your internet connection. If the problem persists, try again later or contact Facebook support directly through the official Facebook help center.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
