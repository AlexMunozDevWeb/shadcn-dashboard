'use client'
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function AlertDialogDemo() {

  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <AlertDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}>
        <AlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={ () => console.log('cancel') }>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={ () => console.log('continue') }>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  
      <Button onClick={ () => setDialogOpen(true)}>Open Dialog</Button>
    </div>
  )
}
