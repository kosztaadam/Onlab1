function renderGraph(simart, enable) {

    var fisheye = d3.fisheye.circular()
        .radius(100)
        .distortion(2);

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    graph = JSON.parse(simart);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {
            return d.id;
        }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    var update = function () {

        svg.selectAll("g.links").remove();
        svg.selectAll("g.nodes").remove()

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", function (d) {
                return Math.sqrt(d.value);
            });

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", 5)
            .attr("fill", function (d) {
                return color(d.group);
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("title")
            .text(function (d) {
                return d.id;
            });

        function ticked() {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        d3.select("svg").on("mousemove", function () {

            if(enable)
                fisheye.focus(d3.mouse(this));

            node.each(function (d) {
                    d.fisheye = fisheye(d);
                })
                .attr("cx", function (d) {
                    return d.fisheye.x;
                })
                .attr("cy", function (d) {
                    return d.fisheye.y;
                })
                .attr("r", function (d) {
                    return d.fisheye.z * 4.5;
                });

            link.attr("x1", function (d) {
                    return d.source.fisheye.x;
                })
                .attr("y1", function (d) {
                    return d.source.fisheye.y;
                })
                .attr("x2", function (d) {
                    return d.target.fisheye.x;
                })
                .attr("y2", function (d) {
                    return d.target.fisheye.y;
                });

        });
    };

    update();

// Add and remove elements on the graph object
    function addNode(id, group) {
        graph.nodes.push({
            "id": id,
            "group": group
        });
        update();
    }

    function addLink(source, target) {
        graph.links.push({"source": source, "target": target});
        update();
    }

    function removeNode(id) {
        var i = 0;
        var n = findNode(id);
        while (i < graph.links.length) {
            if ((graph.links[i]['source'] == n) || (graph.links[i]['target'] == n)) {
                graph.links.splice(i, 1);
            }
            else i++;
        }
        graph.nodes.splice(findNodeIndex(id), 1);
        update();
    }

    function removeLink(source, target) {
        for (var i = 0; i < graph.links.length; i++) {
            if (graph.links[i].source.id == source && graph.links[i].target.id == target) {
                graph.links.splice(i, 1);
                break;
            }
        }
        update();
    }

    function removeallLinks() {
        graph.links.splice(0, graph.links.length);
        update();
    }

    function removeAllNodes() {
        graph.nodes.splice(0, graph.links.length);
        update();
    }

    function findNode(id) {
        for (var i in graph.nodes) {
            if (graph.nodes[i]["id"] === id) return graph.nodes[i];
        }
    }

    function findNodeIndex(id) {
        for (var i = 0; i < graph.nodes.length; i++) {
            if (graph.nodes[i].id == id) {
                return i;
            }
        }
    }

    /*
     setTimeout(function () {
     removeNode('The Killers');
     }, 8000);*/
    /*
     for (var j = 0; j < graph.links.length; j++) {
     (function (j) {

     setTimeout(function () {
     removeLink(graph.links[j].source, graph.links[j].target);
     }, j * 2000);

     })(j);
     }
     */
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }


}

function renderHightlihtedGraph(simart, enable) {

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    graph = JSON.parse(simart);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {
            return d.id;
        }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    var update = function () {

        svg.selectAll("g.links").remove();
        svg.selectAll("g.nodes").remove()

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", function (d) {
                return Math.sqrt(d.value);
            });

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", 5)
            .attr("fill", function (d) {
                return color(d.group);
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("title")
            .text(function (d) {
                return d.id;
            });

        function ticked() {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        node.on("mouseover", function (d) {
            link.style('stroke-width', function (l) {
                if (d === l.source || d === l.target)
                    return 3;
                else
                    return 2;
            });
            node.style('r', function (l) {
                if (d == l) {
                    return 8;
                }
                else
                    return 5;
            })
        })

    };

    update();

// Add and remove elements on the graph object
    function addNode(id, group) {
        graph.nodes.push({
            "id": id,
            "group": group
        });
        update();
    }

    function addLink(source, target) {
        graph.links.push({"source": source, "target": target});
        update();
    }

    function removeNode(id) {
        var i = 0;
        var n = findNode(id);
        while (i < graph.links.length) {
            if ((graph.links[i]['source'] == n) || (graph.links[i]['target'] == n)) {
                graph.links.splice(i, 1);
            }
            else i++;
        }
        graph.nodes.splice(findNodeIndex(id), 1);
        update();
    }

    function removeLink(source, target) {
        for (var i = 0; i < graph.links.length; i++) {
            if (graph.links[i].source.id == source && graph.links[i].target.id == target) {
                graph.links.splice(i, 1);
                break;
            }
        }
        update();
    }

    function removeallLinks() {
        graph.links.splice(0, graph.links.length);
        update();
    }

    function removeAllNodes() {
        graph.nodes.splice(0, graph.links.length);
        update();
    }

    function findNode(id) {
        for (var i in graph.nodes) {
            if (graph.nodes[i]["id"] === id) return graph.nodes[i];
        }
    }

    function findNodeIndex(id) {
        for (var i = 0; i < graph.nodes.length; i++) {
            if (graph.nodes[i].id == id) {
                return i;
            }
        }
    }

    /*
     setTimeout(function () {
     removeNode('The Killers');
     }, 8000);*/
    /*
     for (var j = 0; j < graph.links.length; j++) {
     (function (j) {

     setTimeout(function () {
     removeLink(graph.links[j].source, graph.links[j].target);
     }, j * 2000);

     })(j);
     }
     */
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }


}