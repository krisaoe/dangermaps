### Firebase: (https://dangerstudio.firebaseio.com/)

### Firebase schema:
    {
        maps: [
            {
                id: "map_whateverwhatever",
                title: "Northwest Coffee House",
                background: "northwest.png",
                music: "northwest.mp3",
                player: {
                    startX: 10,
                    startY: 10,
                    startDir: "right"
                },
                walls: [
                    {id: "wall_whateverwhatever", x:1 y:1},
                    {id: "wall_whateverwhatever", x:1 y:2},
                    {id: "wall_whateverwhatever", x:1 y:3},
                    {id: "wall_whateverwhatever", x:1 y:4}
                ],
                signs: [
                    {
                        x:2,
                        y:1,
                        action: {
                            id: "action_whateverwhatever",
                            content: [ "msg pages", "go", "herrrrrrre" ],
                        }
                    }
                ]
            }
        ]
    }
    
### Notes

- Stay as unlinked to Firebase as possible. Don't use any features, just plop the JSON in there.
- Don't use Firebases's push or anything, just set stuff at the map level