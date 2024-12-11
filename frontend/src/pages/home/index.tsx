import { Button } from "@/components/ui/button";
import { IoColorPaletteOutline, IoCreateOutline } from "react-icons/io5";
import { HiOutlinePrinter } from "react-icons/hi2";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { GoNorthStar } from "react-icons/go";
import { WiStars } from "react-icons/wi";
import { PiShootingStar } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main>
      <header>
        <div className="container">
          <div className="flex justify-between h-14 items-center">
            <div>
              <Link to="/">
                <h1 className="text-3xl font-bold">Routine Management</h1>
              </Link>
            </div>
            <div className="flex gap-4">
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth/register">Sign Up</Link>
              </Button>
              <Button size="lg" asChild>
                <Link to="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <section className="h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center">
        <div className="container">
          <div className="py-20">
            <div className="relative flex flex-col justify-center items-center max-w-4xl text-center mx-auto">
              <GoNorthStar className="text-2xl absolute left-12 top-16 -z-10 text-primary animate-pulse" />
              <GoNorthStar className="text-2xl absolute right-24 top-8 -z-10 text-primary animate-pulse" />
              <GoNorthStar className="text-2xl absolute left-24 bottom-8 -z-10 text-primary animate-pulse" />
              <GoNorthStar className="text-2xl absolute right-12 bottom-16 -z-10 text-primary animate-pulse" />
              <a
                href="#"
                className="border rounded-full px-4 py-1 text-sm flex items-center gap-x-1"
              >
                <WiStars className="text-lg" /> Open Source
              </a>
              <h1 className="text-5xl md:text-7xl font-bold my-6">
                Build Just What You Need.
              </h1>
              <p className="text-lg">
                Create your routines and share them with others!
              </p>
              <Button className="rounded-full mt-10 px-12 py-6 text-lg" asChild>
                <Link to="/new">
                  <PiShootingStar className="mr-3" /> Create Now
                  <PiShootingStar className="ml-3 -rotate-90" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 mt-24 gap-12">
              <div>
                <MdOutlineFileDownloadDone className="w-12 h-12 text-primary mx-auto" />
                <h4 className="text-xl font-semibold my-4 text-center">
                  Class Routine Creation
                </h4>
                <p className="text-center">
                  Easily create personalized class schedules with an intuitive
                  interface designed for students.
                </p>
              </div>
              <div>
                <IoCreateOutline className="w-12 h-12 text-primary mx-auto" />
                <h4 className="text-xl font-semibold my-4 text-center">
                  Flexible Editing
                </h4>
                <p className="text-center">
                  Quickly update and modify your schedule to accommodate changes
                  in class times or personal commitments.
                </p>
              </div>
              <div>
                <HiOutlinePrinter className="w-12 h-12 text-primary mx-auto" />
                <h4 className="text-xl font-semibold my-4 text-center">
                  Printable Schedules
                </h4>
                <p className="text-center">
                  Print your class routine in a user-friendly format, perfect
                  for quick reference and planning.
                </p>
              </div>
              <div>
                <IoColorPaletteOutline className="w-12 h-12 text-primary mx-auto" />
                <h4 className="text-xl font-semibold my-4 text-center">
                  User-Friendly UI
                </h4>
                <p className="text-center">
                  Enjoy a simple and clean user interface that makes navigating
                  and managing your schedule a breeze.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
