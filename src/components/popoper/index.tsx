import { AnimatePresence, motion } from 'framer-motion'
import { FloatingPortal, useFloating, offset, flip, shift } from '@floating-ui/react'

import React, { useRef, useState } from 'react'

interface propChildren {
  children: React.ReactNode
  consomer: React.ReactNode
}

export default function Popoper({ children, consomer }: propChildren) {
  const [open, setOpen] = useState(false)
  const arrowLeaf = useRef<HTMLElement>(null)

  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [offset(10), flip(), shift()]
  })

  const hideopen = () => {
    setOpen(false)
  }

  const openok = () => {
    setOpen(true)
  }
  return (
    <li className='flex items-center' ref={refs.setReference} onMouseEnter={openok} onMouseLeave={hideopen}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              {consomer}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </li>
  )
}
