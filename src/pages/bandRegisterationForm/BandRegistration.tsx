import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import Navbar from "../../components/registrationPageComponents/registrationNavbar";

interface BandFormData {
  bandName: string;
  email: string;
  password: string;
  genres: string[];
  bio: string;
  locationCity: string;
  locationState: string;
  formationYear: number;
  memberNeeds: string[];
  influences: string;
  audioSamples: FileList | null;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
    website?: string;
  };
}

const BandRegistration = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BandFormData>();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [neededPositions, setNeededPositions] = useState<string[]>([]);

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

  const positions = [
    "Lead Vocalist",
    "Backing Vocals",
    "Lead Guitar",
    "Rhythm Guitar",
    "Bass Guitar",
    "Drums",
    "Keyboard",
    "Piano",
    "Saxophone",
    "Trumpet",
    "Violin",
    "Other",
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      if (fileArray.length > 3) {
        alert("You can only upload up to 3 files");
        return;
      }
      setUploadedFiles(fileArray);
    }
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handlePositionToggle = (position: string) => {
    setNeededPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    );
  };

  const onSubmit = async (data: BandFormData) => {
    try {
      const formData = new FormData();

      // Add basic band information
      formData.append("bandName", data.bandName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("genres", JSON.stringify(selectedGenres));
      formData.append("memberNeeds", JSON.stringify(neededPositions));

      // Add location and other details
      formData.append("locationCity", data.locationCity);
      formData.append("locationState", data.locationState);
      formData.append("formationYear", data.formationYear.toString());
      formData.append("bio", data.bio);
      formData.append("influences", data.influences);

      // Add social links
      formData.append(
        "socialLinks",
        JSON.stringify({
          instagram: data.socialLinks.instagram || "",
          youtube: data.socialLinks.youtube || "",
          spotify: data.socialLinks.spotify || "",
          website: data.socialLinks.website || "",
        })
      );

      // Add audio files
      uploadedFiles.forEach((file, index) => {
        formData.append(`audioSample${index}`, file);
      });

      // Log form data for debugging
      console.log("Form submission data:", {
        ...data,
        genres: selectedGenres,
        memberNeeds: neededPositions,
        audioFiles: uploadedFiles.map((f) => f.name),
      });

      alert("Band registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white items-center justify-center">
        <Navbar />
        <div className="max-w-2xl w-full mx-auto mt-20 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Create Your Band Profile
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
                <h3 className="text-xl font-semibold mb-4">
                  Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Band Name
                  </label>
                  <input
                    {...register("bandName", {
                      required: "Band name is required",
                    })}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.bandName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.bandName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
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
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">
                      City
                    </label>
                    <input
                      {...register("locationCity", {
                        required: "City is required",
                      })}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">
                      State
                    </label>
                    <input
                      {...register("locationState", {
                        required: "State is required",
                      })}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
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
                <h3 className="text-xl font-semibold mb-4">Band Details</h3>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Formation Year
                  </label>
                  <input
                    type="number"
                    {...register("formationYear", {
                      required: "Formation year is required",
                      min: {
                        value: 1900,
                        message: "Please enter a valid year",
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future",
                      },
                    })}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
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

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    Looking for
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {positions.map((position) => (
                      <button
                        key={position}
                        type="button"
                        onClick={() => handlePositionToggle(position)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          neededPositions.includes(position)
                            ? "bg-purple-600 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {position}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Musical Influences
                  </label>
                  <textarea
                    {...register("influences")}
                    rows={3}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Tell us about your musical influences..."
                  />
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
                <h3 className="text-xl font-semibold mb-4">Media & Links</h3>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Band Bio
                  </label>
                  <textarea
                    {...register("bio", {
                      required: "Please write a band bio",
                      maxLength: {
                        value: 1000,
                        message: "Bio must be less than 1000 characters",
                      },
                    })}
                    rows={4}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Tell potential members and fans about your band..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    Music Samples
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
                        Upload band demos or recordings
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        Maximum 3 files, up to 10MB each
                      </span>
                    </label>
                  </div>
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
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Social Media & Web Presence
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300 w-24">
                      Instagram:
                    </span>
                    <input
                      {...register("socialLinks.instagram")}
                      placeholder="@username"
                      className="flex-1 p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300 w-24">YouTube:</span>
                    <input
                      {...register("socialLinks.youtube")}
                      placeholder="Channel URL"
                      className="flex-1 p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300 w-24">Spotify:</span>
                    <input
                      {...register("socialLinks.spotify")}
                      placeholder="Artist URL"
                      className="flex-1 p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300 w-24">Website:</span>
                    <input
                      {...register("socialLinks.website")}
                      placeholder="Your band's website"
                      className="flex-1 p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
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
    </>
  );
};

export default BandRegistration;
