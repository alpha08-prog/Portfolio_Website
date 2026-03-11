#include <bits/stdc++.h>

using namespace std;

const int INF = INT16_MAX;

void floydWarshall(vector<vector<int>> &graph)
{
    int V = graph.size();

    vector<vector<int>> dist = graph;

    // Floyd-Warshall algorithm
    for (int k = 0; k < V; k++)
    {
        for (int i = 0; i < V; i++)
        {
            for (int j = 0; j < V; j++)
            {
                if (dist[i][k] != INF && dist[k][j] != INF)
                {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    cout << "The shortest distances between every pair of vertices:\n";
    for (int i = 0; i < V; i++)
    {
        for (int j = 0; j < V; j++)
        {
            if (dist[i][j] == INF)
            {
                cout << "INF ";
            }
            else
            {
                cout << dist[i][j] << "   ";
            }
        }
        cout << endl;
    }
}

int main()
{

    vector<vector<int>> graph = {
        {0, 5, INF, 6, INF},
        {INF, 0, 1, INF, 7},
        {3, INF, 0, 4, INF},
        {INF, INF, 2, 0, 3},
        {2, INF, INF, 5, 0}};

    floydWarshall(graph);

    return 0;
}
