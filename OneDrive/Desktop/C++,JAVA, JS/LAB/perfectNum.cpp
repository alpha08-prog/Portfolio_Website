#include <iostream>
#include <stdlib.h>
#include <vector>
#include <map>
#include <set>
#include <stack>
#include <queue>
#include <unordered_map>
using namespace std;

int perfect(int num)
{
    int sum = 0;
    for (int i = 1; i < num; i++)
    {

        if (num % i == 0)
        {
            sum += i;
        }
    }
    if (num == sum)
    {
        cout << num << " is a perfect number" << endl;
    }
    else{
        cout<<num<<" is not a perfect number"<<endl;
    }
}

int main()
{
    int num;
    cout << "Enter the number: " << endl;
    cin >> num;

    perfect(num);

    return 0;
}