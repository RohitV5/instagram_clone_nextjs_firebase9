import { useSession } from "next-auth/react";
import MiniProfile from "./MiniProfile"
import Posts from "./Posts"
import Stories from "./Stories"
import Suggestions from "./Suggestions"

function Feed() {

    const {data:session} = useSession();

    return (
        // on mobile we see one col grid , on medium its 2 col, on xl its 3 col  //if no session then add some css
        <main className={`grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl ${!session &&
            "!grid-cols-1 !max-w-3xl"}`}>
            {/* Section  */}
            <section className="col-span-2 ">
                {/* Stories  */}
                <Stories/>
                {/* Posts */}
                <Posts/>

            </section>

            {/* Section */} 
            {session && (
                <section className="hidden xl:inline-grid md:col-span-1" >
                    <div className="fixed top-20">
                        {/* Mini Profile */}
                        <MiniProfile />

                        {/* Suggestions */}
                        <Suggestions />

                    </div>


                </section>
            )}

            
        </main>
    )
}

export default Feed
