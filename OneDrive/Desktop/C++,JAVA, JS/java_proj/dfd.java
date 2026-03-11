
import java.io.*;
import java.util.*;
import java.util.zip.GZIPInputStream;
import java.util.PriorityQueue;

public class dfd {
    static class Edge {
        int source, destination, weight;
        Edge(int source, int destination, int weight) {
            this.source = source;
            this.destination = destination;
            this.weight = weight;
        }
    }

    static Map<Integer, List<Edge>> graph = new HashMap<>();
    static Map<Integer, Integer> distances = new HashMap<>();
    static Map<Integer, Integer> previous = new HashMap<>();

    // Load the graph from the dataset
    @SuppressWarnings("unused")
    public static void loadGraph(String filename) throws IOException {
        File file = new File(filename);
        if (!file.exists()) {
            System.out.println("File not found: " + filename);
            return;
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new GZIPInputStream(new FileInputStream(file))))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(" ");
                int src = Integer.parseInt(parts[0]);
                int dest = Integer.parseInt(parts[1]);
                int weight = Integer.parseInt(parts[2]);
                graph.computeIfAbsent(src, k -> new ArrayList<>()).add(new Edge(src, dest, weight));
                graph.computeIfAbsent(dest, k -> new ArrayList<>()).add(new Edge(dest, src, weight)); // For undirected graph
            }
        }
    }

    // Dijkstra's algorithm with real-time updates
    public static void dijkstra(int startNode) {
        distances.clear();
        previous.clear();
        
        // Initialize distances and previous nodes
        for (int node : graph.keySet()) {
            distances.put(node, Integer.MAX_VALUE);
            previous.put(node, -1);
        }
        distances.put(startNode, 0);

        PriorityQueue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(edge -> edge.weight));
        pq.add(new Edge(startNode, startNode, 0));

        while (!pq.isEmpty()) {
            Edge currentEdge = pq.poll();
            int currentNode = currentEdge.destination;

            // For every neighbor, relax the edge
            for (Edge edge : graph.getOrDefault(currentNode, new ArrayList<>())) {
                int newDist = distances.get(currentNode) + edge.weight;
                if (newDist < distances.get(edge.destination)) {
                    distances.put(edge.destination, newDist);
                    previous.put(edge.destination, currentNode);
                    pq.add(new Edge(currentNode, edge.destination, newDist));
                }
            }
        }
    }

    // Add a new edge to the graph
    @SuppressWarnings("unused")
    public static void addEdge(int source, int destination, int weight) {
        graph.computeIfAbsent(source, k -> new ArrayList<>()).add(new Edge(source, destination, weight));
        graph.computeIfAbsent(destination, k -> new ArrayList<>()).add(new Edge(destination, source, weight));
        // Optionally, we can call dijkstra() again for a quick update, or handle incrementally
        dijkstra(source); // This is for simplicity, ideally incremental updates would be more efficient
    }

    // Remove an edge from the graph
    public static void removeEdge(int source, int destination) {
        List<Edge> sourceEdges = graph.get(source);
        if (sourceEdges != null) {
            sourceEdges.removeIf(edge -> edge.destination == destination);
        }
        List<Edge> destinationEdges = graph.get(destination);
        if (destinationEdges != null) {
            destinationEdges.removeIf(edge -> edge.destination == source);
        }
        // After edge removal, we should recompute the shortest path from the source or affected nodes
        dijkstra(source); // This is for simplicity, but should be more efficient with incremental updates
    }

    // Update the weight of an existing edge
    public static void updateEdgeWeight(int source, int destination, int newWeight) {
        List<Edge> sourceEdges = graph.get(source);
        if (sourceEdges != null) {
            for (Edge edge : sourceEdges) {
                if (edge.destination == destination) {
                    edge.weight = newWeight;
                    break;
                }
            }
        }
        List<Edge> destinationEdges = graph.get(destination);
        if (destinationEdges != null) {
            for (Edge edge : destinationEdges) {
                if (edge.destination == source) {
                    edge.weight = newWeight;
                    break;
                }
            }
        }
        // After weight update, we need to re-run Dijkstra to update affected distances
        dijkstra(source); // For simplicity, we're recomputing everything from the source node
    }

    public static void main(String[] args) throws IOException {
        // Load the graph from a file
        String filePath = "C:\\Users\\agraw\\Downloads\\facebook_combined.txt.gz";
        loadGraph(filePath);

        int startNode = 0; // Choose a start node (e.g., 0)
        
        // Run initial Dijkstra
        dijkstra(startNode);
        System.out.println("Initial Dijkstra distances from node " + startNode + ": " + distances);

        // Real-time updates (add/remove edges or update weights)
        addEdge(1, 5, 10);  // Add an edge with weight 10 between nodes 1 and 5
        removeEdge(2, 4);    // Remove the edge between nodes 2 and 4
        updateEdgeWeight(3, 6, 2);  // Update the weight of the edge between nodes 3 and 6 to 2

        // Re-run Dijkstra after updates
        dijkstra(startNode);
        System.out.println("Updated Dijkstra distances from node " + startNode + ": " + distances);
    }
}