<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <!-- Content of your home page goes here -->
  </div>
</template>

<script>
import apiClient from "../services/api"; // Make sure to import your configured axios instance

export default {
  name: 'HomePage',
  data() {
    return {
      // other data properties if needed
    };
  },
  created() {
    this.checkVisitor();
  },
  methods: {
    checkVisitor() {
      const isConnected = !!localStorage.getItem('accessToken'); // Check if the user is logged in

      if (!isConnected) {
        // Check if visitor information already exists in localStorage
        if (!localStorage.getItem('visitorInfo')) {
          // No visitor info available, create a new visitor
          this.createVisitor();
        }
        // If visitorInfo exists in localStorage, do nothing
      }
    },
    createVisitor() {
      apiClient.post('/visitors/')
          .then(response => {
            // Handle the response after creating the visitor
            // Store the visitor information in localStorage
            localStorage.setItem('visitorInfo', JSON.stringify(response.data));
            // Add any other processing if necessary
          })
          .catch(error => {
            console.error('There was an error creating the visitor:', error);
          });
    }
  }
};
</script>
