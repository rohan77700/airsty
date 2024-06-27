'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
        onClick={() => router.push('/')}
        className="hidden md:block cursor-pointer"
        src="/images/logo.png"
        width="100"
        height="100"
        alt="Logo"
        />
    );
}
 
export default Logo;