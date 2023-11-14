FROM node:18.18.0-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV domain "https://www.nohenugu.org.ng/"
ENV MONGOOSE_URI "mongodb+srv://root:16210Xa0hS7XJUZK@cluster0.in7zad9.mongodb.net/NOHEADMINDB?retryWrites=true&w=majority"
CMD ["npm", "start"]