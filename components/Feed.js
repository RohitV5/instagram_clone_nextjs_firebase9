import Posts from "./Posts"
import Stories from "./Stories"

function Feed() {
    return (
        // on mobile we see one col grid , on medium its 2 col, on xl its 3 col
        <main className="grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl">
            {/* Section  */}
            <section className="col-span-2 ">
                {/* Stories  */}
                <Stories/>
                {/* Posts */}
                <Posts/>

            </section>

            {/* Section */}
            <section className="col-span-1">
                {/* Mini Profile */}
                {/* Suggestions */}
            </section>
            
        </main>
    )
}

export default Feed
