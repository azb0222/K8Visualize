package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"path/filepath"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

func main() {
	//serve visualization index.html
	clientset, err := getClientSet()
	if err != nil {
		panic(err.Error())
	}

	// Access the API to list pods
	pods, err := clientset.CoreV1().Pods("").List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}

	// Iterate over the list of pods and print their names and namespaces
	for _, pod := range pods.Items {
		fmt.Printf("Name: %s, Namespace: %s\n", pod.Name, pod.Namespace)
	}
}

func getClientSet() (*kubernetes.Clientset, error) {
	//change to use InClusterConfig when deploying
	var kubeconfig *string
	if home := os.Getenv("HOME"); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	// use the current context in kubeconfig
	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	if err != nil {
		panic(err.Error())
	}
	return kubernetes.NewForConfig(config)
}

// seperate out API logic into another file
// func APIStuff() {
// 	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
// 		w.Write([]byte("Hello from Go backend!"))
// 	})

// 	log.Println("Server is running on http://localhost:8080")
// 	log.Fatal(http.ListenAndServe(":8080", nil))
// }
