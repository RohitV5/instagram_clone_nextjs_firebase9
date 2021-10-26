import Stories from "./Stories"

function Feed() {
    return (
        <main className="grid grid-cols-1 border-red-600 md:grid-col-2 md:max-w-3xl xl:grid-col-3 xl:max-w-6xl max-auto">
            {/* Section  */}
            <section className="col-span-2 border-red-600">
                {/* Stories  */}
                <Stories/>
                {/* Posts */}
            </section>

            {/* Section */}
            <section>
                {/* Mini Profile */}
                {/* Suggestions */}
            </section>
            
        </main>
    )
}

export default Feed
