#include <iostream>
   #include <vector>
   using namespace std;

   bool isUlam(int num, const vector<int>& ulamSeq) {
       int count = 0;
       for (int i = 0; i < ulamSeq.size(); i++) {
           for (int j = i + 1; j < ulamSeq.size(); j++) {
               if (ulamSeq[i] + ulamSeq[j] == num) {
                   count++;
               }
               if (count > 1) return false;
           }
       }
       return count == 1;
   }

   int main() {
       int n;
       cout << "Enter number of ulam numbers to generate: ";
       cin >> n;

       vector<int> ulamSeq = {1, 2};
       while (ulamSeq.size() < n) {
           int next = ulamSeq.back() + 1;
           while (!isUlam(next, ulamSeq)) {
               next++;
           }
           ulamSeq.push_back(next);
       }

       cout << "First " << n << " Ulam numbers: ";
       for (int num : ulamSeq) {
           cout << num << " ";
       }

       return 0;
   }
