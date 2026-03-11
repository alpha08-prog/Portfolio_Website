#include <iostream>
#include <stdlib.h>
#include <vector>
#include <map>
#include <set>
#include <stack>
#include <queue>
#include <unordered_map>
using namespace std;

int cube(int num)
{
    for (int i = 1; i <= num; i++)
    {
        if (i * i * i == num)
        {
            return 1;
        }
    }
    return 0;
}

int main()
{
    for (int i = 0; i < 1000; i++)
    {
        if (cube(i) == 1)
        {
            cout << i << endl;
        }
    }

    return 0;
}