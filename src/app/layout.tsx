import React, {ReactNode} from 'react';
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Yeda Video Player',
    description: 'by Pavel Souviron'
};

export default function RootLayout({children}: Readonly<{children: ReactNode;}>) {
    return (
        <html lang="en">
        <body className={'--font-geist-sans antialiased'}>
        {children}
        </body>
        </html>
    );
}
