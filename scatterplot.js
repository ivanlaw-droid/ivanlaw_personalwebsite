
        // Tree data structure
       
        const educationTree = {
            name: "Education",
            children: [
                {
                    name: "High School",
                    children: [
                        {
                            name: "ABC High School",
                            details: {
                                graduationYear: 2015,
                                subjects: ["Mathematics", "Science", "Literature"]
                            }
                        }
                    ]
                },
                {
                    name: "Undergraduate",
                    children: [
                        {
                            name: "XYZ University",
                            details: {
                                degree: "Bachelor of Science",
                                major: "Computer Science",
                                graduationYear: 2019,
                                subjects: ["Data Structures", "Algorithms", "Web Development"]
                            }
                        }
                    ]
                },
                {
                    name: "Postgraduate",
                    children: [
                        {
                            name: "LMN University",
                            details: {
                                degree: "Master of Science",
                                major: "Artificial Intelligence",
                                graduationYear: 2021,
                                subjects: ["Machine Learning", "Deep Learning", "Natural Language Processing"]
                            }
                        }
                    ]
                },
                {
                    name: "Online Courses",
                    children: [
                        {
                            name: "Full Stack Development",
                            details: {
                                platform: "Coursera",
                                completionYear: 2020,
                                skills: ["HTML", "CSS", "JavaScript", "React"]
                            }
                        },
                        {
                            name: "Data Science",
                            details: {
                                platform: "edX",
                                completionYear: 2021,
                                skills: ["Python", "Statistics", "Data Visualization"]
                            }
                        }
                    ]
                }
            ]
        };

         //Set dimensions for the SVG
        const width = 600;
        const height = 400;

        // Create an SVG element
        const svg = d3.select("#vis-scatterplot").append("svg")
            .attr("width", width)
            .attr("height", height);

        // Create a tree layout
        const treeLayout = d3.tree().size([height, width - 160]);

        // Create the root node
        const root = d3.hierarchy(educationTree);

        // Generate the tree
        treeLayout(root);

        // Create links between nodes
        svg.selectAll(".link")
            .data(root.links())
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x)
            );

        // Create nodes
        const node = svg.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y},${d.x})`);

        // Add circles to nodes
        node.append("circle")
            .attr("r", 5);

        // Add text labels
        node.append("text")
            .attr("dy", 3)
            .attr("x", d => d.children ? -8 : 8)
            .style("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name);
    
        
