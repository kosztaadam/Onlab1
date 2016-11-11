<ul>
<% for(var item in similarArtistsList) { %>
<li><a href="/graph/<%= item %>"><%= item %></a></li>
        <% } %>
</ul>


<script>

var width = 960, height = 380;

var color = d3.scale.category10();

var nodes = [];
var links = [];

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-120)
    .linkDistance(80)
    .size([width, height])
    .on("tick", tick);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

<% for(var i = 0; i < 2; i++) {%>
    var defaultartist = {id: '<%= artist %>', name:'<%= artist %>', type:'2'};
    var end = false;
    var tempnode;

    if(nodes.length > 0) {
        nodes.forEach(function (n) {
            if (defaultartist.id == n.id) {
                tempnode = n;
                end = true;
            }
        });
        if(end == true) {
            defaultartist = tempnode;
            defaultartist.type = '2';
        }
        else {
            nodes.push(defaultartist);
        }
    }
    else {
        nodes.push(defaultartist);
        defaultartist.type = '1';
    }


    //links.push({source: n, target: a});
<% for(var item in similarArtistsList) { %>
        var a = {id: '<%= item %>', name: '<%= item %>',type:'3'};
        var end2 = false;
        var temp2;

        nodes.forEach(function (n) {
            if (a.id == n.id) {
                end2 = true;
                temp2 = n;
            }
        });
        if(end2 == true) {
            a = temp2;
        }
        else {
            nodes.push(a);
        }

        links.push({source: defaultartist, target: a});
    <% } %>
<% } %>

start();
/*
 // 1. Add three nodes and three links.
 setInterval(function() {
 var a = {id: "a"+Math.random(),uid:Math.floor(Math.random()*20)};

 nodes.push(a);
 if (nodes.length>0){
 links.push({source: a, target: nodes[Math.floor(Math.random()*nodes.length)]});
 }
 start();
 }, 100);
 */
function start() {
    link = link.data(force.links(), function(d) { return d.source.id + "-" + d.target.id; });
    link.enter().insert("line", ".node").attr("class", "link");
    link.exit().remove();

    node = node.data(force.nodes(), function(d) { return d.id;});
    node.enter()
        .append("circle").attr("class", function(d) { return "node " + d.id; })
        .attr("r", 10)
        .style("fill", function(d){
            return color(d.type);
        })
        .call(force.drag);
    // .on("click", function(d){alert(d.uid);});
    node.exit().remove()

    node.append("title")
        .text(function(d) { return d.name; });

    force.start();
}

function tick() {
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
}


</script>/**
 * Created by Koszta Ádám on 2016. 10. 26..
 */


<% include header %>

<div class="container">

    <div class="page-header">
<h1><%= artist %></h1>
    </div>

    <div class="table">
    <table>
    <tbody>
    <tr>
    <td><img src="<%= artistImage %>" ></td>
    <td><ul>
    <li><b>Top album:</b> <%= artistTopAlbum %></li>
    <li><b>Listeners:</b> <%= artistListeners %></li>
    <li><b>Play count:</b> <%= artistPlayCount %></li>
    <li><b>Top tracks:</b></li>
<ul>
<% artistTopTracks.forEach(function(item){ %>
    <li><%= item.name %></li>
        <% }) %>
</ul>
<li><b>Similar artists:</b></li>

</ul>
</td>
<td>

</td>
</tr>
</tbody>
</table>
</div>

<div class="page-header">
    <h2>Similar artists graph</h2>
</div>

<style>

.links line {
    stroke: #999;
    stroke-opacity: 0.6;
}

.nodes circle {
    stroke: #fff;
    stroke-width: 1.5px;
}

</style>
<svg width="960" height="600"></svg>
    <script src="https://d3js.org/d3.v4.min.js"></script>
    <script>

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("miserables.json", function(error, graph) {
    if (error) throw error;

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr("fill", function(d) { return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(function(d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }
});

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

</script>

</div>

<div class="container">

    <div class="page-header">
    <h2>Search</h2>
    </div>

    <form class="form-inline">
    <form method = "post">
    <div class="form-group">
    <input type="text" class="form-control" name="artistid" id="artistid" size="40">
    </div>
    <div class="form-group">
    <button type="submit" formmethod="post" class="btn btn-default">Search</button>
    </div>
    </form>
    </form>
    <br>

    </div>

    <% include footer %>