"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Camera, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image"; // Add this import

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/portfolio", label: "Portfolio" },
	{ href: "/packages", label: "Packages" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
			<div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
				<Link
					href="/"
					className="flex items-center gap-2"
					onClick={() => setIsMenuOpen(false)}
				>
					<Image
						src="/logo.png"
						alt="Vision Logo"
						width={42}
						height={42}
					/>{" "}
					{/* <Camera className="h-8 w-8 text-primary" /> */}
					<span className="text-xl font-headline font-bold text-foreground">
						Vision Captures
					</span>
				</Link>

				<nav className="hidden md:flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								pathname === link.href
									? "text-primary"
									: "text-muted-foreground"
							)}
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="md:hidden">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
						<span className="sr-only">Toggle menu</span>
					</Button>
				</div>
			</div>

			{isMenuOpen && (
				<div className="md:hidden absolute top-full left-0 w-full bg-background border-t border-border shadow-lg">
					<nav className="flex flex-col items-center gap-4 py-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setIsMenuOpen(false)}
								className={cn(
									"text-lg font-medium transition-colors hover:text-primary",
									pathname === link.href
										? "text-primary"
										: "text-muted-foreground"
								)}
							>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
