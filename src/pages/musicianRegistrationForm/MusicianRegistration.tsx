import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Music, Upload, AlertCircle } from "lucide-react";
import Navbar from "../../components/registrationPageComponents/registrationNavbar";

interface MusicianFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  instrument: string;
  experience: string;
  genres: string[];
  bio: string;
  audioSamples: FileList | null;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
}

const MusicianRegistration = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MusicianFormData>();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const genres = [
    "Rock",
    "Jazz",
    "Blues",
    "Classical",
    "Pop",
    "R&B",
    "Hip Hop",
    "Electronic",
    "Country",
    "Folk",
    "Metal",
  ];

  const instruments = [
    "Guitar",
    "Bass",
    "Drums",
    "Vocals",
    "Piano/Keyboard",
    "Saxophone",
    "Trumpet",
    "Violin",
    "Other",
  ];

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const onSubmit = async (data: MusicianFormData) => {
    try {
      // Create FormData instance
      const formData = new FormData();

      // Add basic information
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone || "");

      // Add musical background
      formData.append("instrument", data.instrument);
      formData.append("experience", data.experience);
      formData.append("genres", JSON.stringify(selectedGenres));
      formData.append("bio", data.bio);

      // Add social links
      formData.append(
        "socialLinks",
        JSON.stringify({
          instagram: data.socialLinks.instagram || "",
          youtube: data.socialLinks.youtube || "",
          spotify: data.socialLinks.spotify || "",
        })
      );

      // Add audio files
      uploadedFiles.forEach((file, index) => {
        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} exceeds 10MB limit`);
        }

        // Validate file type
        const validTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
        if (!validTypes.includes(file.type)) {
          throw new Error(`File ${file.name} is not a supported audio format`);
        }

        formData.append(`audioSample${index}`, file);
      });

      // Log form data for debugging
      console.log("Form submission data:", {
        ...data,
        genres: selectedGenres,
        audioFiles: uploadedFiles.map((f) => f.name),
      });

      // Example API call
      const response = await fetch("your-api-endpoint/register-musician", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header, let the browser set it with boundary
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Handle successful registration
      console.log("Registration successful:", result);

      // You might want to:
      // 1. Show success message
      alert("Registration successful!");
      // 2. Redirect to profile page
      // navigate('/profile');
      // 3. Store auth token
      // localStorage.setItem('token', result.token);
    } catch (error) {
      // Handle errors
      console.error("Registration error:", error);
      // Show error message to user
      alert(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Convert FileList to array and update state
      setUploadedFiles(Array.from(files));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white items-center justify-center">
      <Navbar />
      <div className="max-w-2xl w-full mx-auto mt-20 p-6 md:p-8 lg:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Create Your Musician Profile
          </h2>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  step >= i ? "bg-purple-600" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Basic Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    <AlertCircle size={14} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Musical Background</h3>

              <div>
                <label className="block text-sm font-medium mb-1">
                  <Music size={16} />
                  Primary Instrument
                </label>
                <select
                  {...register("instrument", {
                    required: "Please select an instrument",
                  })}
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="">Select your instrument</option>
                  {instruments.map((instrument) => (
                    <option key={instrument} value={instrument}>
                      {instrument}
                    </option>
                  ))}
                </select>
                {errors.instrument && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.instrument.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Years of Experience
                </label>
                <select
                  {...register("experience", {
                    required: "Please select experience level",
                  })}
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="">Select experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Musical Genres
                </label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => handleGenreToggle(genre)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedGenres.includes(genre)
                          ? "bg-purple-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition duration-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">
                Additional Information
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Upload size={16} />
                  Performance Samples
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="audio/*"
                    multiple
                    className="hidden"
                    id="audio-upload"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="audio-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload size={24} className="mb-2" />
                    <span className="text-sm text-gray-300">
                      Upload audio samples (MP3, WAV)
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Maximum 3 files, up to 10MB each
                    </span>
                  </label>
                </div>

                {/* Display uploaded files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-800 p-2 rounded"
                      >
                        <span className="text-sm">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedFiles(
                              uploadedFiles.filter((_, i) => i !== index)
                            );
                          }}
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  {...register("bio", {
                    required: "Please write a short bio",
                    maxLength: {
                      value: 500,
                      message: "Bio must be less than 500 characters",
                    },
                  })}
                  rows={4}
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Tell us about yourself and your musical journey..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">
                  Social Media Links (Optional)
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Instagram:</span>
                  <input
                    {...register("socialLinks.instagram")}
                    placeholder="@username"
                    className="flex-1 p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">YouTube:</span>
                  <input
                    {...register("socialLinks.youtube")}
                    placeholder="Channel URL"
                    className="flex-1 p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Spotify:</span>
                  <input
                    {...register("socialLinks.spotify")}
                    placeholder="Artist URL"
                    className="flex-1 p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300"
                >
                  Complete Registration
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MusicianRegistration;
