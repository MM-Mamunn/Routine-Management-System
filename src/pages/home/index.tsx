import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
              <Button size="lg" variant="outline">
                Sign Up
              </Button>
              <Button size="lg">Sign In</Button>
            </div>
          </div>
        </div>
      </header>
      <section className="h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center">
        <div className="container">
          <div className="text-center leading-loose">
            <h1 className="text-4xl font-bold">
              Welcome to Routine Management
            </h1>
            <p className="text-muted-foreground">
              Create, manage, and track your routines with ease.
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <Select>
              
            </Select>
          </div>
        </div>
      </section>
    </main>
  );
}
