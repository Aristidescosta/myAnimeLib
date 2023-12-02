import React from 'react'
import { To } from 'react-router-dom'

export type TNavbarItem = {
	menu: string
	link: To
	icon: React.ReactNode
}