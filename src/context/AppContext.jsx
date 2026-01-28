
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Real-time listener for inquiries (only for authenticated admins)
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('fintxyug_auth') === 'true';
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, "inquiries"), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const loadedInquiries = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInquiries(loadedInquiries);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching inquiries: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addInquiry = async (inquiry) => {
        const newInquiry = {
            ...inquiry,
            status: 'Pending',
            date: new Date().toLocaleDateString(),
            timestamp: Date.now() // for better sorting
        };

        try {
            const docRef = await addDoc(collection(db, "inquiries"), newInquiry);
            setInquiries([{ id: docRef.id, ...newInquiry }, ...inquiries]);
            return true;
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error submitting form: " + e.message);
            return false;
        }
    };

    const updateInquiry = async (id, updates) => {
        try {
            const inquiryRef = doc(db, "inquiries", id);
            await updateDoc(inquiryRef, updates);
            setInquiries(inquiries.map(inv => inv.id === id ? { ...inv, ...updates } : inv));
            return true;
        } catch (e) {
            console.error("Error updating inquiry: ", e);
            return false;
        }
    };

    const updateInquiryStatus = async (id, status) => {
        return await updateInquiry(id, { status: status });
    };

    return (
        <AppContext.Provider value={{ inquiries, addInquiry, updateInquiry, updateInquiryStatus, loading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
