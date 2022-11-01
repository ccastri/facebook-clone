import StoryCard from "./StoryCard"

const stories = [
    {
        name: "Camilo Castrillon",
        src: "/yo.jpeg",
        profile:  "https://links.papareact.com/l4v"
    },
    {
        name: "Bill Gates",
        src: "https://links.papareact.com/4u4",
        profile: "https://links.papareact.com/zvy"
    },
    {
        name: "Jeff Bezoz",
        src: "https://links.papareact.com/k2j",
        profile: "https://links.papareact.com/f0p"
    },
    {
        name: "Mark Zuckerberg",
        src: "https://links.papareact.com/xql",
        profile: "https://links.papareact.com/snf"
    },
]

console.log(<StoryCard />)
function Stories() {
    return (
        <div className="flex justify-center space-x-3 mx-auto">
            {
                stories.map(story => (

                    (

                        <StoryCard
                            key={story.src}
                            name={story.name}
                            src={story.src}
                            profile={story.profile}
                        />
                    )
                )
                )
            }
        </div>
    )
}

export default Stories